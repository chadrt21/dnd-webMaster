import {
	asRouteFunction,
} from '../utility';

import * as userController from './UserController';

export default app => {
	app.route('/api/user/profile')
		.get(asRouteFunction(userController.getProfile, true));

	app.route('/api/user/profile')
		.post(asRouteFunction(userController.updateProfile, true));
};
