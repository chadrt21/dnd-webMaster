/**
 * @description This file defines the logic for serializing the user from passport google authentication.
 * Here, the user should be retrieved from the database and a user model should be created
 * and stored in a session (handled by express elsewhere) so that on each request, we have
 * access to the user object.
 * 
 * @author Joseph Stewart
 */

import User from './User';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import MockStrategy from 'passport-mock-strategy';
import testUser from '../../testing/test-user-object';

import {
	getSQLConnection,
	promiseQuery,
} from '../utility';

import googleConfig from './client-secret.json';

const Strategy = process.env.NODE_ENV === 'test' ? MockStrategy : GoogleStrategy;
const name =  process.env.NODE_ENV === 'test' ? 'google' : undefined;
const user = process.env.NODE_ENV === 'test' ? testUser : undefined;

export default passport => {

	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	passport.use(new Strategy({
		clientID: googleConfig.web.client_id,
		clientSecret: googleConfig.web.client_secret,
		callbackURL: 'http://localhost:8085/api/auth/login/callback',
		name,
		user,
	},
	async (accessToken, refreshToken, profile, done) => {
		// If we are in a test environment, the user is the first parameter and the done function is the second
		// so we need to swap them out
		if (process.env.NODE_ENV === 'test') {
			done = refreshToken;
			profile = {
				displayName: accessToken.name,
				emails: [
					{
						value: accessToken.email,
					},
				],
			};
		}

		try {
			// Obtain database connection
			const connection = await getSQLConnection();

			// Try to find the user in the database
			let user;
			const userSearchResults = await promiseQuery(
				connection,
				`
				SELECT
					dmID,
					dmName,
					dmBio,
					dmUserName
				FROM
					dm
				WHERE
					dmUserName = :email
			`,
				{
					email: profile.emails[0].value,
				}
			);

			if (!userSearchResults[0]) {
				// Insert DM into database if they don't exist already
				const insertResults = await promiseQuery(
					connection,
					`
					INSERT INTO dm
						(dmName, dmUserName, dmBio)
					VALUES
						(:displayName, :email, '')
				`,
					{
						displayName: profile.displayName,
						email: profile.emails[0].value,
					}
				);
				user = {
					dmID: insertResults.insertId,
					dmName: profile.displayName,
					dmBio: '',
					dmUserName: profile.emails[0].value,
				};
			} else {
				user = userSearchResults[0];
			}

			done(null, new User(profile.displayName, profile.emails[0].value, user));
		} catch (err) {
			console.log(err);
			return done(err, false);
		}
	}));

};