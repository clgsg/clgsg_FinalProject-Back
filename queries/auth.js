const { sql } = require("slonik");
const { createQueryId } = require("slonik/dist/src/utilities");
const {userExists} = require('./users')

const confirmUser = async (db, { token }) => {
	try {
		return await db.transaction(async (tx) => {
			const { rowCount, rows } = await tx.query(sql`
				SELECT * FROM users
				WHERE activation_token = ${token}
      `);
			if (!rowCount) throw new Error(" token");
			await tx.query(sql`
				UPDATE users
				SET activation_token = null, updated_at = now()
				WHERE activation_token = ${token}
      `);
			return rows;
		});
	} catch (e) {
		console.info("⛔ Error at confirmUser query: ", e.message);
		return false;
	}
};

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

const getUserByToken = async (db, token) => {
	try {
		const { email, username } = await db.one(
			sql`SELECT username, email FROM users WHERE activation_token LIKE ${token}`
		);
		return { email, username };
	} catch (error) {
		console.info("⛔ Error at getUserByToken query: ", error.message);
		return false;
	}
};


const updatePassword = async (db, {user}) => {
	try {
		await db.query(
			sql`UPDATE users SET hashed_pwd=${user.newPassword}, activation_token=NULL WHERE email LIKE ${user.email}`
		);
		return true;
	} catch (error) {
		console.info("⛔ Error at updatePassword query:", error.message);
		return false;
	}
};

const signup = async (db, {email, username, password}) => {
	try {
		// const hashed_pwd= await encrypt(password)

		await db.query(
			sql`
			INSERT INTO users (email, username, hashed_pwd)
			VALUES (${email}, ${username}, ${password})
		`);
		return true;
	} catch (error) {
		console.info("⛔ Error at signup query:", error.message);
		return false;
	}
}


// const getUserByEmailOrUsername = async (db, { email, username}) => {
// 	try {
// 		const result = await db.one(
// 			sql`
// 				SELECT * FROM users
// 				WHERE email LIKE ${email} OR username LIKE ${username}
// 			`);
// 		if (!result) {
// 			throw new Error("Las credenciales no son válidas");
// 		}
// 		return result;
// 	} catch (error) {
// 		console.info("⛔ Error at getUserByEmailOrUsername query:", error.message);
// 		return false;
// 	}
// };


const login = async (db, {email, username, password}) => {
	try {
		const result = await db.one(
			sql`
			SELECT * FROM users
			WHERE (email LIKE ${email} OR username LIKE ${username})
			AND hashed_pwd=${password}
			`
		);
		return result
	} catch (error) {
		console.info("⛔ Error at login query:", error.message);
	}
}
module.exports = {
	userExists,
	confirmUser,
	updateToken,
	getUserByToken,
	updatePassword,
	signup,
	// getUserByEmailOrUsername,
	login,
};