export const get = path => (
	fetch(path, { credentials: 'include' })
		.then(response => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
);

export const httpDelete = path => (
	fetch(path, { credentials: 'include', method: 'DELETE' })
		.then(response => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
);

export const post = (path, body) => (
	fetch(
		path,
		{
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify(body),
		}
	)
		.then(response => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
);