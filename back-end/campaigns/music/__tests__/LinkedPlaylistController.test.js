import request from 'supertest';
import app from '../../server';
import testUser from '../../../testing/test-user-object';

// Create the 'user' agent that will be making the test API requests
// It is important to test from the user's point of view
const agent = request.agent(app);

const X = '';

// Authenticate the 'user' before each request
beforeEach(async () => {
	return await agent.get('/api/auth/login').send();
})

describe('LinkedPlaylistController', () => {

});