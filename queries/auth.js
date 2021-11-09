const { sql } = require("slonik");
const {newHash} = require('../services/auth/passwordUpdate')
const userExists = async (db, { email, username }) => {
	return await db.maybeOne(sql`
		SELECT * FROM users
		WHERE email = ${email} OR username = ${username}
  `);
};

const createUser = async (db, { email, username, hashed_pwd, activation_token }) => {
	try {
		const result = await userExists(db, { email, username });
		if (result) throw new Error("⛔ Choose a different username and/or email");
		return await db.query(sql`
			INSERT INTO users ( email, username, hash, activation_token )
			VALUES ( ${email}, ${username}, ${hashed_pwd}, ${activation_token} )
    `);
	} catch (e) {
		console.info("⛔ Error at createUser query:", e.message);
		return false;
	}
};

const confirmUser = async (db, { token }) => {
	try {
		return await db.transaction(async (tx) => {
			const { rowCount, rows } = await tx.query(sql`
				SELECT * FROM users
				WHERE activation_token = ${token}
      `);
			if (!rowCount) throw new Error("Invalid token");
			await tx.query(sql`
				UPDATE users
				SET
				activation_token = null,
				active = true,
				updated_at = now()
				WHERE
				activation_token = ${token}
      `);
			return rows;
		});
	} catch (e) {
		console.info("⛔ Error at confirmUser query: ", e.message);
		return false;
	}
};

// const getUserByEmailOrUsername = async (
// 	db,
// 	mail = "",
// 	username = "",
// 	compareFn
// ) => {
// 	try {
// 		const result = await db.one(
// 			sql`
// 				SELECT email, username, hash FROM users
// 				WHERE email LIKE ${mail}
// 				OR username LIKE ${username}
// 			`);

// 		if (!result) {
// 			throw new Error("Invalid credentials");
// 		}

// 		const isValidPassword = await compareFn(result.hash);

// 		if (!isValidPassword) {
// 			throw new Error("Invalid credentials");
// 		}
// 		return result;
// 	} catch (error) {
// 		console.info("⛔ Error at getUserByEmail query:", error.message);
// 		return false;
// 	}
// };

const updateToken = async (
	db,
	token,
	{ email = "default", username = "bydefault" }
) => {
	try {
		await db.query(
			sql`UPDATE users SET activation_token = ${token} WHERE email LIKE ${email} OR username LIKE ${username}`
		);
		return true;
	} catch (error) {
		console.info("⛔ Error at updateToken query: ", error.message);
		return false;
	}
};

const getByToken = async (db, token) => {
	try {
		const { email, username } = await db.one(
			sql`SELECT username, email FROM users WHERE activation_token LIKE ${token}`
		);
		return { email, username };
	} catch (error) {
		console.info("⛔ Error at getByToken query: ", error.message);
		return false;
	}
};


const updateUserPassword = async (db, user) => {
	try {
		await db.query(
			sql`UPDATE users SET hashed_pwd=${user.newHash}, activation_token=NULL WHERE email LIKE ${user.email}`
		);
		return true;
	} catch (error) {
		console.info("⛔ Error at updateUserPassword query:", error.message);
		return false;
	}
};

module.exports = {
	userExists,
	createUser,
	confirmUser,
	getUserByEmailOrUsername,
	updateToken,
	getByToken,
	updateUserPassword,
};