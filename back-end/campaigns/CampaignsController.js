import {
	promiseQuery,
} from '../utility';

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
				(campaignTitle, campaignDesc)
			VALUES
				(:campaignTitle, '')
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