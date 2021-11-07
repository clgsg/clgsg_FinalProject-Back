const { sql } = require("slonik");

const userExist = async (db, { email, username }) => {
	return await db.maybeOne(sql`
		SELECT * FROM users
		WHERE email = ${email} OR username = ${username}
  `);
};

const createUser = async (db, { email, username, hashed_pwd, token }) => {
	try {
		const result = await userExist(db, { email, username });
		if (result) throw new Error("Username or email already on use");
		return await db.query(sql`
			INSERT INTO users ( email, username, hash, activation_token )
			VALUES ( ${email}, ${username}, ${hashed_pwd}, ${token} )
    `);
	} catch (e) {
		console.info('> Error at "createUser" query:', e.message);
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
			if (!rowCount) throw new Error("invalid token");
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
		console.info('> Error at "confirmUser" query:', e.message);
		return false;
	}
};

// const getUserByEmailOrUsername = async (
// 	db,
// 	mail = "",
// 	username = "",
// 	comparationFn
// ) => {
// 	try {
// 		const result = await db.one(
// 			sql`
// 				SELECT email, username, hash FROM users
// 				WHERE email LIKE ${mail}
// 				OR username LIKE ${username}
// 			`);

// 		if (!result) {
// 			throw new Error("invalid credentials");
// 		}

// 		const isValidPassword = await comparationFn(result.hash);

// 		if (!isValidPassword) {
// 			throw new Error("invalid credentials");
// 		}

// 		return result;
// 	} catch (error) {
// 		console.info("error at getUserByEmail query:", error.message);
// 		return false;
// 	}
// };

// const updateToken = async (
// 	db,
// 	token,
// 	{ email = "default", username = "bydefault" }
// ) => {
// 	try {
// 		await db.query(
// 			sql`UPDATE users SET activation_token = ${token} WHERE email LIKE ${email} OR username LIKE ${username}`
// 		);
// 		return true;
// 	} catch (error) {
// 		console.info("error at updateToken query:", error.message);
// 		return false;
// 	}
// };

// const getByToken = async (db, token) => {
// 	try {
// 		const { email, username } = await db.one(
// 			sql`SELECT username, email FROM users WHERE activation_token LIKE ${token}`
// 		);
// 		return { email, username };
// 	} catch (error) {
// 		console.info("error at getByToken query:", error.message);
// 		return false;
// 	}
// };

module.exports = {
	createUser,
	// confirmUser,
	// getUserByEmailOrUsername,
	// updateToken,
	// getByToken,
};