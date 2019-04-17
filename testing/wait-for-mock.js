export default (mockFn, timeout) => new Promise((resolve, reject) => {
	const intervalTime = 25;
	let elapsed = 0;
	
	if (!timeout) {
		timeout = 2000;
	}

	if (mockFn.mock.calls > 0) {
		return resolve(true);
	}

	const interval = setInterval(() => {
		if (mockFn.mock.calls.length > 0) {
			clearInterval(interval);
			return resolve(true);
		}
		elapsed += intervalTime;
		if (elapsed >= timeout) {
			clearInterval(interval);
			return reject(false);
		}
	}, intervalTime);
});
