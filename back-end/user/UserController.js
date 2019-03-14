import {
	promiseQuery,
} from '../utility';

export const getProfile = async (path, query, user, connection) => {
	const { id } = user;

	const results = await promiseQuery(
		connection,
		`
			SELECT * FROM dm WHERE dmID = :id
		`,
		{ id }
	);

	return results;
};

export const updateProfile = async (path, query, user, connection, body) => {
	const { id } = user;
	const {
		field,
		value,
	} = body;

	if (field.toLowerCase() === 'dmid' || field.toLowerCase() === 'dmusername') {
		return {
			reload: true,
		};
	}

	const results = await promiseQuery(
		connection,
		`
			UPDATE dm SET :(field) = :value WHERE dmID = :id
		`,
		{ field, value, id }
	);

	return {
		reload: false,
		changed: results.changedRows > 0,
	};
};
