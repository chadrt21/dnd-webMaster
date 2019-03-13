/**
 * @description This class models the User that is making the request. From it we can get their user id,
 * email, profile information, and so on.
 * 
 * @author Joseph Stewart
 */

export default class User {
	name = 'User\'s Display name';
	email = 'sample@example.org';
	id = -1;
	bio = '';

	constructor(name, email, dbUser) {
		this.name = name;
		this.email = email;
		this.id = dbUser.dmID;
		this.bio = dbUser.dmBio;
	}
}