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

import googleConfig from './client-secret.json';

export default passport => {

	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));

	passport.use(new GoogleStrategy({
		clientID: googleConfig.web.client_id,
		clientSecret: googleConfig.web.client_secret,
		callbackURL: 'http://localhost:8085/api/auth/login/callback',
	},
	(accessToken, refreshToken, profile, done) => {
		// Retrieve user from database before returning user
		done(null, new User(profile.displayName, profile.emails[0].value));
	}));

};