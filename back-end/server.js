/* eslint-disable no-console */
import 'babel-polyfill';
import express from 'express';
import path from 'path';
import configureAuthentication from './authentication';
import registerRoutes from './route-registry';

// Declare our server object
const app = express();

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'GET');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	next();
});

// Declare the login page and it's stylesheet as the only publicly accessible route
app.route('/login').get((request, response) => {
	response.sendFile('front-end/dist/login.html', { root: __dirname });
});

app.route('/css/login.css').get((request, response) => {
	response.sendFile('front-end/dist/css/login.css', { root: __dirname });
});

// Set up authentication so that any route below this method call requires the user be logged in
configureAuthentication(app);

// Tell the server to look for static resources (.css, .js, .html files, etc.) in front-end/dist
app.use(express.static(path.resolve(__dirname, 'front-end/dist/')));


// REGISTER API ROUTES HERE (PREFERABLY IN A FUNCTION EXPORTED FROM ANOTHER FILE)
registerRoutes(app);

// Tell the app that all other requests not defined by our restful API should send the user the main.html file
app.route('*').get((request, response) => {
	response.sendFile('front-end/dist/main.html', { root: __dirname });
});

// Start the server on port 8085
app.listen(8085);

// Inform the user that the server is started at port 8085
console.log('Server listening on port 8085');