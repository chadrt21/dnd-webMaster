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