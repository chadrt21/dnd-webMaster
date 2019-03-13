/**
 * @description Here we set up authentication logic for logging out and middleware logic for checking
 * authentication on each request
 * 
 * @author Joseph Stewart
 */

export const isLoggedIn = (request, response, next) => {
	if (request.isAuthenticated() || process.env.NO_AUTH) {
		return next();
	}

	if (!request.url.includes('.')) {
		request.session.lastURL = request.url;
	}
	response.redirect('/login');
	response.end();
};

export const logout = (request, response) => {
	request.logout();
	response.redirect('/login');
	response.end();
};