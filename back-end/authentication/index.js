/**
 * @description Here we define the routes required for user authentication
 * @author Joseph Stewart
 */

import passport from 'passport';
import session from 'express-session';
import configurePassport from './passport-config';

import * as authenticationRoutes from './AuthenticationController';

export default app => {
	configurePassport(passport);
	app.use(session({ secret: 'thedungeonpals' }));
	app.use(passport.initialize());
	app.use(passport.session());

	app.get(
		'/api/auth/login/callback',
		(request, response, next) => passport.authenticate('google', {
			failureRedirect: '/login',
			successRedirect: request.session.lastURL || '/',
		})(request, response, next)
	);
	
	app.get(
		'/api/auth/login',
		passport.authenticate('google', {
			scope: [
				'profile',
				'email',
			],
		})
	);

	app.get(
		'/api/auth/logout',
		authenticationRoutes.logout
	);

	app.use(authenticationRoutes.isLoggedIn);
};