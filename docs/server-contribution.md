# Server Contribution Guide

- [Description](#description)
- [How to Write API Routes](#how-to-write-api-routes)
- [Utility Functions](#utility-functions)
- [User Model](#user-model)

## Description

This document outlines basic information you will need in order to contribute to the server side code. This means server utility function documentation, route declaration, file structure paradigms, and user information access.

## How to Write API Routes

Each publicly accessible RESTful API route maps to a server side function. Express takes each request, checks it's authentication (and any other middleware we set up), then calls the function associated with that request's route.

So an example of this might be:
```
/api/campaigns   ---maps-to--->    getAllCampaigns()
```
Where the function `getAllCampaigns` makes a database request and returns JSON results back to the client. Parameters can be passed to server functions in two ways, through the url path and query parameters. Path parameters are part of the path. So in the route `/api/campaigns/:id`, `id` would be a path parameter. Query parameters are key value pairs at the end of a request after a question mark. So in the route `/api/search/spells?search=Acid%20%Splash`, `search` would be a query parameter with the value of "Acid Splash". [Here](https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api) is a helpful stack overflow to help you know when you should use which. Each request is also injected with a user object that provides information about the user making the request. See below for the user class structure.

You can declare functions that access these parameters and the user object in the following way. Note that these methods can also be async.

```js
// back-end/component/SomeController.js

// ... more server methods

export const myServerMethod = (path, query, user, connection, body) => {
	const { id } = path; // path.id is a path parameter
	const { search } = query; // query.search is a query parameter
	const { email } = user; // user.email is part of the user model
	// Connection is the database connection
	const { arm } = body; // body.arm is part of the body

	// Here you would make a database query of some kind

	// The return value is returned to the client, an empty object is returned if the value
	// is null or not an object
	return {
		results: [],
		message: 'There were no results!',
	};
};

// ... more server methods
```

Once you write your method, you need to register it with the ExpressJS instance and say which route it connects to. If the folder does not have an `index.js` file, then you will have to create one. It should export a function that takes an Express app as a parameter. Inside this function, you can define the routes as follows. Notice that you do not need to declare query parameters in the route declaration. Also notice that the method is connected to the route using the `asRouteFunction()` function. This function formats your function so that it can work with express. Optionally, it can also pass a database connection into your callback if you set the second parameter to true.

```js
// back-end/component/index.js

import {
	asRouteFunction
} from '../utility'; // make sure this is the relative path to /back-end/utility.js

import * as routeFunctions from './SomeController';

export default app => {
	app.route('/api/controller/resource/:id')
		.get(asRouteFunction(routeFunctions.myServerMethod, true));
};
```

Once the route is declared in the component's route registry, **If this is a new component**,  it must be added to the global route registry in `/back-end/route-registry.js`. Go into this file and import the component's route registry function and call it with the app parameter. It should look something like this.

```js
// back-end/route-registry.js

// If the path is a folder, then it defaults to index.js inside that folder
import registerComponent from './component';

export default app => {
	// ... other components being registered (like maybe registerCampaignRoutes(app))
	registerComponent(app);
	// ... other components being registered
};
```

Once that is done, you good to go. Check to see if it works by running `npm run server` in the console and checking the route in your browser. So you would do something like `https://localhost:8085/api/controller/resource/1?search=Value` to test it.

## Utility Functions

These methods can be exported from /back-end/utility.js and used in your server code.

### `asRouteFunction(callback)`

#### Description

This function formats a server method so that it can be plugged into Express. Normal express functions take a request and a response as parameters, but we want to write our server methods so that we can call them programmatically if we want to. This functions wraps our server methods in another function that takes a request and a response and it passes in path parameters, query parameters, and the user object into `callback`.

#### Usage

```js
import {
	asRouteFunction
} from '../utility';

import * as routeFunctions from './SomeController';

export default app => {
	app.route('/api/controller/resource/:id')
		.get(asRouteFunction(routeFunctions.myServerMethod));
};
```

## User Model

The user object schema is as follows:
```json
{
	"name": "String",
	"email": "String"
}
```