export const get = path => (
	fetch(path, { credentials: 'include' })
		.then(response => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
);

export const post = (path, body) => (
	fetch(path, { credentials: 'include', method: 'POST', body })
		.then(response => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
);