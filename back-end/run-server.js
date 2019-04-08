/* eslint-disable no-console */
import app from './server';
// Start the server on port 8085
app.listen(8085);

// Inform the user that the server is started at port 8085
console.log('Server listening on http://localhost:8085');
