/* eslint-disable no-console */
import express from 'express';
import path from 'path';

// Declare our server object
const app = express();

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'GET');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	next();
});

// Tell the server to look for static resources (.css, .js, .html files, etc.) in front-end/dist
app.use(express.static(path.resolve(__dirname, 'front-end/dist/')));


// REGISTER API ROUTES HERE (PREFERABLY IN A FUNCTION EXPORTED FROM ANOTHER FILE)


// Tell the app that all other requests not defined by our restful API should send the user the main.html file
app.route('*').get((request, response) => {
	response.sendFile('front-end/dist/main.html', { root: __dirname });
});

// Start the server on port 8085
app.listen(8085);

// Inform the user that the server is started at port 8085
console.log('Server listening on port 8085');