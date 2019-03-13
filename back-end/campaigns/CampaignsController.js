import {
	promiseQuery,
	getSQLConnection,
	unauthorizedError,
} from '../utility';

/**
 * @description This is a piece of express middleware that checks if a user has
 * access to the given campaign, if they do have access, the request continues as
 * normal, if not, the request returns a non-authorized http error code
 */
export const userCanAccessCampaign = async (request, response, next) => {
	const { user, params } = request;

	const connection = await getSQLConnection();
	const campaign = await checkIfCampaignExists(params, null, user, connection);
	connection.release();

	if (campaign.exists) {
		return next();
	}
	return unauthorizedError(response, 'You do not have access to this campaign');
};

/**
 * @description Returns an array of all the campaigns associated with the user
 */
export const getAllCampaigns = async (path, query, user, connection) => {
	const { id } = user;
	const results = await promiseQuery(
		connection,
		`
			SELECT 
				campaign.campaignID,
				campaignTitle
			FROM
				campaignlist JOIN
				campaign ON campaign.campaignID = campaignlist.campaignID
			WHERE
				campaignlist.dmID = :id
		`,
		{ id }
	);
	return results;
};

/**
 * @description Creates a new campaign in the database
 */
export const createNewCampaign = async (path, query, user, connection, body) => {
	const { id } = user;
	const { campaignTitle } = body;
	const campaignResults = await promiseQuery(
		connection,
		`
			INSERT INTO campaign
				(campaignTitle, campaignDesc, settingData)
			VALUES
				(:campaignTitle, '', '{}')
		`,
		{
			campaignTitle,
		}
	);
	await promiseQuery(
		connection,
		`
			INSERT INTO campaignlist
				(campaignID, dmID)
			VALUES
				(:campaignID, :id)
		`,
		{
			id,
			campaignID: campaignResults.insertId,
		}
	);
	return {
		campaignID: campaignResults.insertId,
	};
};

/**
 * @description Finds if a specific campaign exists in the database returns
 * the result as a boolean in the return JSON by the property "exists"
 */
export const checkIfCampaignExists = async (path, query, user, connection) => {
	const { campaignID } = path;
	const { id } = user;

	const result = await promiseQuery(
		connection,
		`
		SELECT 
			COUNT(campaign.campaignID) as result
		FROM
			campaignlist
				JOIN
			campaign ON campaignlist.campaignID = campaign.campaignID
		WHERE
			campaignlist.dmID = :id
			AND campaign.campaignID = :campaignID
		`,
		{ campaignID, id }
	);

	return {
		exists: result[0].result > 0,
	};
};

/**
 * @description Returns tool settings for a specific tool associated with a campaign
 */
export const getToolSettings = async (path, query, user, connection) => {
	const { campaignID, tool } = path;

	const result = await promiseQuery(
		connection,
		`
			SELECT
				settingData->:tool AS toolSettings
			FROM
				campaign
			WHERE
				campaignID = :campaignID
		`,
		{ campaignID, tool: `$.${tool}` }
	);

	if (result[0].toolSettings) {
		return JSON.parse(result[0].toolSettings);
	} else {
		return {};
	}
};

/**
 * @description Updates the settings for a specific tool
 */
export const updateToolSettings = async (path, query, user, connection, body) => {
	const { campaignID, tool } = path;
	const { value } = body;

	const result = await promiseQuery(
		connection,
		`
			UPDATE
				campaign
			SET
				settingData = JSON_SET(
					settingData,
					:tool,
					JSON_MERGE(:value, '{}')
				)
			WHERE
				campaignID = :campaignID
		`,
		{ campaignID, tool: `$.${tool}`, value: JSON.stringify(value) }
	);

	return {
		updated: result.changedRows > 0,
	};
};
