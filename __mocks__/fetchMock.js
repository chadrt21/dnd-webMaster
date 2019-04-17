/**
 * A mock fetch object might look like
 * 
 * 	[
 * 		{
 * 			url: '/api/campaigns/1',
 * 			'GET': {
 * 				status: 200,
 * 				responseBody: [
 * 					{ name: Joe Shmoe }
 * 				]
 * 			},
 * 		}
 * 	]
 */

const actualFetch = window.fetch;

// Mock fetch and return a deterministic response
export const mockFetch = urls => {
	window.fetch = jest.fn(
		(url, options) => {
			const method = options.method || 'GET';
			const mockedResponseObject = urls.find(obj => new RegExp(obj.url).test(url));

			if (!mockedResponseObject || !mockedResponseObject[method]) {
				console.error(`${method} ${url} mock fetch request not handled`);
				return Promise.resolve({
					status: 500,
					json: () => Promise.resolve({})
				});
			}

			const matches = new RegExp(mockedResponseObject.url).exec(url);

			let {
				status,
				responseBody,
				callback,
				getResponseBody,
			} = mockedResponseObject[method];

			if (callback) {
				callback(url, options, matches);
			}

			if (getResponseBody) {
				responseBody = getResponseBody(url, options, matches);
			}

			return new Promise((resolve, reject) => 
				resolve({
					status,
					ok: true,
					json: () => new Promise(resolve => resolve(responseBody)),
				})
			)
		}
	);	
};

export const unmockFetch = () => window.fetch = actualFetch;
