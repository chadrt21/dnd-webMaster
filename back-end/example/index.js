import {
	asRouteFunction,
} from '../utility';

import * as exampleFunctions from './ExampleController';

export default app => {
	app.route('/api/example/:id')
		.get(asRouteFunction(exampleFunctions.myServerMethod));
};