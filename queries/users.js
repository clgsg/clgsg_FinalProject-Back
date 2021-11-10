const { sql } = require("slonik");
const { encrypt, createActivationToken } = require("../../helpers/hash");
//? Podrán actualizarse en el perfil: profile_pic y password,
//* Algunas queries de users y auth están duplicadas

const getUserData = async (db, { email = "", username = "" }) => {
	if(!username && !email){
		throw new Error("Please input your username or email")
	}
	try {
		const user = await db.maybeOne(sql`
		SELECT username, first_name, family_name, email, user_gender, birth_date, user_level, pref_sports, created_at
		FROM users
		WHERE username = ${username} OR email = ${email}
		`);
		return user;
	} catch (error) {
		console.info("⛔ Error at getUserData: ", error.message);
		return false;
	}
};

const getUserByEmailOrUsername = async (
	db, {email = "", username = "", hashed_pwd}, compareFn ) => {
	try {
		if(!username && !email){
			throw new Error("Please input your username or email")
		}
		const isValidPassword = await compareFn(result.hash);
		if (!isValidPassword) {
			throw new Error("Incorrect password");
		}
		const result = await db.one(
			sql`
				SELECT email, username, hash FROM users
				WHERE (email LIKE ${email} OR username LIKE ${username})
				AND hashed_pwd =
			`);
		if (!result) {
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
	compareFn //función currificada
) => {
	try {
		if(!username && !email){
			throw new Error("Please input your username or email")
		}
		const result = db.transaction(async tnx => {
			const user = await getUserData(tnx, { email, username})
			if(!user)
				throw new Error ("Credentials don't match our records")
					await tnx.maybeOne(sql`
						UPDATE users
						SET email = ${newEmail} updated_at = now()
						WHERE (username = ${username} OR email=${email}) AND hashed_pwd=${}
			`)};
			const isValidPassword = await compareFn(result.hash);
				if(!isValidPassword){
					throw new Error("Incorrect password");
		}
		return result

		} catch (error) {
		console.info("⛔ Error at updateUsersEmail query: ", error.message);
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