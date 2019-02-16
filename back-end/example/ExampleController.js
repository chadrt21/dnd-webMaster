/* eslint-disable no-console */

export const myServerMethod = (path, query, user) => {
	console.log('/:id', path.id);
	console.log('?search=', query.search);
	console.log('User email', user.email);

	return {
		response: 'The request was good! Check the server\'s console!',
	};
};