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

import {
	getSQLConnection,
	promiseQuery,
} from '../utility';

import googleConfig from './client-secret.json';

export default passport => {

	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	passport.use(new GoogleStrategy({
		clientID: googleConfig.web.client_id,
		clientSecret: googleConfig.web.client_secret,
		callbackURL: 'http://localhost:8085/api/auth/login/callback',
	},
	async (accessToken, refreshToken, profile, done) => {
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
						(dmName, dmUserName, dmBio, dmCampaignListID)
					VALUES
						(:displayName, :email, '', 0)
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
			return done(err, false);
		}
	}));

};