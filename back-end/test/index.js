import {
	asRouteFunction,
} from '../utility';

import * as testFunctions from './TestController';

export default app => {
	app.route('/api/test/:id')
		.get(asRouteFunction(testFunctions.myServerMethod));
};