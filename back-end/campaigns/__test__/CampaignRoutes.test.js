import request from 'supertest';
import app from '../../server';
import testUser from '../../../testing/test-user-object';

// Create the 'user' agent that will be making the test API requests
// It is important to test from the user's point of view
const agent = request.agent(app);

// Authenticate the 'user' before each request
beforeEach(async () => {
	return await agent.get('/api/auth/login').send();
})

describe('CampaignRoutes', () => {
	// First make sure we can get the campain profile
	it('will test user access to campain', async () => {
		// 1) Test if user has access to campaign and if campaign is empty
		const response = await agent
			.get('/api/campaigns/')
			.send()
			.expect(200);

		// [{"campaignID": 1,"campaignTitle","test"},{...}]
		// 2) check if getAllCampaigns return an empty array
		expect(response.body.lenth()).toBe(0);
	});

// Then create a campaign
	it('will test creation of campaigns', async () => {
		// 2) test the post campaign creation works
		const postResponse = await agent
			.get('/api/campaigns')
			.send({
				campaignTitle: 'Test',
			})
			.expect(200);

		//
		expect(postResponse.body).toBe();
	});

//
	it('will test if campaigns exist', async () => {
		// 3) test if campaigns that were created exists
		const getResponse = await agent
			.get('/api/campaigns/1/exists')
			.send()
			.expect(200);

		expect(getResponse.body).toBe('1')
	});

});
