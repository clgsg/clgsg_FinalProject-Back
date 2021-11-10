const { sql } = require("slonik");
const { encrypt, createActivationToken } = require("../../helpers/hash");
const { sendMail } = require("../../helpers/mailer");
//? comprobar y actualizar qué datos podrán actualizarse en el perfil


const getUserData = async (db, { email, username }) => {
	let whereClause = "";
	if(!username && !email)
	if (username) {
		whereClause = sql`WHERE username = ${username}`;
	} else {
		whereClause = sql`WHERE email = ${email}`;
	}
	console.log("whereClause", whereClause);

	try {
		const user = await db.maybeOne(sql`
		SELECT first_name, family_name, username, email, user_gender, user_level, profile_pic, pref_sports, access_token
		FROM users ${whereClause}
		`);
		console.log("user query", user);
		return user;
	} catch (error) {
		console.info("⛔ Error at getUserData: ", error.message);
		return false;
	}
};

const getUserByEmailOrUsername = async (
	db,
	email = "",
	username = "",
	compareFn
) => {
	try {
		const result = await db.one(
			sql`
				SELECT email, username, hash FROM users
				WHERE email LIKE ${email}
				OR username LIKE ${username}
			`);
		if (!result) {
			throw new Error("Credentials don't match our records");
		}

		const isValidPassword = await compareFn(result.hash);

		if (!isValidPassword) {
			throw new Error("Credentials don't match our records");
		}
		return result;

	} catch (error) {
		console.info("⛔ Error at getUserByEmail query:", error.message);
		return false;
	}
};

const updateUsersEmail = async (
	db,
	{ email, username }, //parámetros que van a tomarse
	{ newEmail }, // Columna que se quiere cambiar
	uploadFn //función currificada
) => {
	try {
		const result = db.transaction(async tnx => {
			const user = await getUserData(tnx, { email, username})
			if(!user)
				throw new Error ("Credentials don't match our records")
					await tnx.maybeOne(sql`
						UPDATE users
						SET email = ${email} updated_at = now()
						WHERE username = ${username} AND email=${email}
			`)};
		return result

		} catch (error) {
		console.info("⛔ error at updateUsersEmail query: ", error.message);
		return false
		}
};


const getAllUsers = async (db) => {
	try {
		await db.query(sql`
			SELECT * FROM users
		`)
		return true;
	} catch (error) {
		console.info("⛔ Error at getAllUsers query: ", error.message);
		return false;
	}
}

module.exports = {
	getUserByEmailOrUsername,
	updateUsersEmail,
	getUserData,
	getAllUsers,
}