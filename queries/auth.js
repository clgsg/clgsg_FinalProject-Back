const { sql } = require("slonik");

const userExists = async (db, { email, username }) => {
	return await db.maybeOne(sql`
	SELECT * FROM users
	WHERE email = ${email} OR username = ${username}
	`);
};

const checkCredentials = async (db, {email, username, password}) => {
	try {
		const result = await db.one(
			sql`
			SELECT username FROM users
			WHERE (email LIKE ${email} OR username LIKE ${username})
			AND hashed_pwd=${password}
			`
			);
			return result
		} catch (error) {
			console.info("⛔ Error at checkCredentials query:", error.message);
		}
	}


const updatePassword = async (db, { email, password, newPassword }) => {
	try {
		await db.one(
			sql`UPDATE users
			SET hashed_pwd=${newPassword}  updated_at = now()
			WHERE email LIKE ${email} AND hashed_pwd=${password}`
		);
		return true;
	} catch (error) {
		console.info("⛔ Error at updatePassword query:", error.message);
		return false;
	}
};


const newUser = async (db, {email, username, password}) => {
		try {
		await db.query(
			sql`
			INSERT INTO users (email, username, hashed_pwd)
			VALUES (${email}, ${username}, ${password})
		`);
		return true;
	} catch (error) {
		console.info("⛔ Error at newUser (signup) query:", error.message);
		return false;
	}
}



const updateEmail = async (db, { email, newEmail, password }) => {
		try {
			await db.one(sql`
			UPDATE users
			SET email = ${newEmail} updated_at = now()
			WHERE email=${email} AND hashed_pwd=${password}`);
			return true;
		} catch (error) {
			console.info("⛔ Error at updateEmail query:", error.message);
			return false;
		}
	};


module.exports = {
	userExists,
	updatePassword,
	newUser,
	checkCredentials,
	updateEmail,
};