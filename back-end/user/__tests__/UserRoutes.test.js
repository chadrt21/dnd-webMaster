import request from 'supertest';
import app from '../../server';
import testUser from '../../../testing/test-user-object';

// Create the 'user' agent that will be making the test API requests
// It is important to test from the user's point of view
const agent = request.agent(app);

const UPDATED_BIO = 'This is my new bio';

// Authenticate the 'user' before each request
beforeEach(async () => {
	return await agent.get('/api/auth/login').send();
})

describe('UserRoutes', () => {
	// First make sure that we can get the user profile
	it('will get user profile information', async () => {
		// 1) Make our fake get request to the profile endpoint and expect 200 OK response
		const response = await agent
			.get('/api/user/profile')
			.send()
			.expect(200);

		// 2) Expect the dmID returned to be the user id created by the test environment
		expect(response.body.dmID).toBe(global.userID);

		// 3) Expect the dmUserName returned to match the test user
		expect(response.body.dmUserName).toBe(testUser.email);

		// 4) Expect the dmBio returned to match the test user
		expect(response.body.dmBio).toBe(testUser.bio);
	});

	// Then make sure that we can update valid user information
	it('will update user profile information', async () => {
		// 1) Make the get request to make sure the current dmBio is what was initially set there
		const getResponse = await agent
			.get('/api/user/profile')
			.send()
			.expect(200);

		// 2) Expect the returned dmID to match the user id created by the test environment
		expect(getResponse.body.dmID).toBe(global.userID);

		// 3) Expect the returned dmBio to match the test user
		expect(getResponse.body.dmBio).toBe(testUser.bio);

		// 4) Make the post request to update dmBio
		// NOTE: THe underlying logic in this controller function is agnostic
		// to the field being updated provided it isn't illegal so there is no
		// need to make post requests for every possible user field
		const postResponse = await agent
			.post('/api/user/profile')
			.send({
				value: UPDATED_BIO,
				field: 'dmBio',
			})
			.expect(200);
		
		// 5) Expect the response to indicate that a row has been changed
		expect(postResponse.body.changed).toBe(true);

		// 6) Expect the response to indicate that the browser need not be reloaded
		expect(postResponse.body.reload).toBe(false);

		// 7) Make a get request to check if the information was actually updated
		const updatedGetResponse = await agent
			.get('/api/user/profile')
			.send()
			.expect(200);

		// 8) Expect that the dmId is still the same
		expect(updatedGetResponse.body.dmID).toBe(global.userID);
		
		// 9) Expect that the returned dmBio matches the updated value we gave it in the post body
		expect(updatedGetResponse.body.dmBio).toBe(UPDATED_BIO);
	});

	// Then make sure that we can't update illegal user information
	it('wont update dmID or dmUserName', async () => {
		// 1) Make the initial get response (as a control variable) and expect 200 OK response
		const getResponse = await agent
			.get('/api/user/profile')
			.send()
			.expect(200);
		
		// 2) Expect that the returned dmID is the user id set in the test environment
		expect(getResponse.body.dmID).toBe(global.userID);
		
		// 3) Expect that the returned dmUserName matches the test user email
		expect(getResponse.body.dmUserName).toBe(testUser.email);

		// 4) Make the post request to try and change the dmID and expect 200 OK response
		const idPostResponse = await agent
			.post('/api/user/profile')
			.send({
				value: 9,
				field: 'dmID',
			})
			.expect(200);
		
		// 5) Expect that the response indicates no rows have been changed
		expect(idPostResponse.body.changed).toBeFalsy();

		// 6) Expect that the response indicate the browser needs to be refreshed
		expect(idPostResponse.body.reload).toBeTruthy();

		// 7) Make the updated get request to ensure that the dmID has not been changed
		const idUpdatedGetResponse = await agent
			.get('/api/user/profile')
			.send()
			.expect(200);

		// 8) Expect that the dmID is still the same
		expect(idUpdatedGetResponse.body.dmID).toBe(global.userID);

		// 9) Make a post request to try and change the dmUserName (used to ID the user on login)
		// and expect a 200 OK response
		const emailPostResponse = await agent
			.post('/api/user/profile')
			.send({
				value: 'notjon@test.net',
				field: 'dmUserName',
			})
			.expect(200);

		// 10) Expect that the response indicates no rows have been changed
		expect(emailPostResponse.body.changed).toBeFalsy();

		// 11) Expect that the response indicate the browser needs to be refreshed
		expect(emailPostResponse.body.reload).toBeTruthy();

		// 12) Make an updated get request to ensure that the email has not been updated and expect 200 OK
		const emailUpdatedGetResponse = await agent
			.get('/api/user/profile')
			.send()
			.expect(200);

		// 13) Expect that the dmUserName is still the same
		expect(emailUpdatedGetResponse.body.dmUserName).toBe(testUser.email);
	})
});
