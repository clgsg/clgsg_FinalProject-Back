const { sql } = require("slonik");

const userExists = async (db, { email, username }) => {
	return await db.maybeOne(sql`
		SELECT * FROM users
		WHERE email = ${email} OR username = ${username}
  `);
};

const createUser = async (db, { email, username, hashed_pwd, activation_token }) => {
	try {
		const result = await userExists(db, { email, username });
		if (result) throw new Error("⛔ Crea otro usuario o usa otro email");
		return await db.query(sql`
			INSERT INTO users ( email, username, hash, activation_token )
			VALUES ( ${email}, ${username}, ${hashed_pwd}, ${activation_token} )
    `);
	} catch (e) {
		console.info("⛔ Error at createUser query:", e.message);
		return false;
	}
};
const getUserData = async (db, { email = "", username = "" }) => {
	if(!username && !email){
		throw new Error("Introduce tu usuario o email")
	}
	try {
		const user = await db.maybeOne(sql`
		SELECT username, first_name, family_name, email, user_gender, birth_date, user_level, pref_sports, created_at
		FROM users
		WHERE username = ${username} OR email = ${email}
		`);
		return user;
	} catch (error) {
		console.info("⛔ Error at getUserData query: ", error.message);
		return false;
	}
};

const getUserByEmailOrUsername = async (
	db,
	mail = "",
	username = "",
	compareFn
) => {
	if(!username && !email){
			throw new Error("Introduce tu usuario o email")
		}
	try {
		const result = await db.one(
			sql`
				SELECT email, username, hash FROM users
				WHERE email LIKE ${mail}
				OR username LIKE ${username}
			`);
		if (!result) {
			throw new Error("Las credenciales no son válidas");
		}

		const isValidPassword = await compareFn(result.hash);
		if (!isValidPassword) {
			throw new Error("Las credenciales no son válidas");
		}
		return result;
	} catch (error) {
		console.info("⛔ Error at getUserByEmail query:", error.message);
		return false;
	}
};

const updateEmail = async (
	db,
	{ email, username }, //parámetros que van a tomarse
	{ newEmail }, // Columna que se quiere cambiar
	compareFn //función currificada
) => {
	try {
		if(!username && !email){
			throw new Error("Introduce tu usuario o email")
		}
		const isValidPassword = await compareFn(result.hash);
		if (!isValidPassword) {
			throw new Error("Las credenciales no son válidas");
		}
		const result = db.transaction(async tnx => {
			const user = await getUserData(tnx, { email, username})
			if(!user)
				throw new Error ("Las credenciales no son válidas")
					await tnx.maybeOne(sql`
						UPDATE users
						SET email = ${newEmail} updated_at = now()
						WHERE (username = ${username} OR email=${email}) AND hashed_pwd=${hashed_pwd}
			`)});
		return result

		} catch (error) {
		console.info("⛔ Error at updateEmail query: ", error.message);
		return false
		}
};

const getAllUsers = async (db) => {
	try {
		const result = await db.query(sql`
			SELECT * FROM users
		`)
		return result;
	} catch (error) {
		console.info("⛔ Error at getAllUsers query: ", error.message);
		return false;
	}
}

const updateProfilePic = async (
	db,
	{ email, username, profile_pic }, //parámetros que van a tomarse
	{ newProfilePic }, // Columna que se quiere cambiar
	compareFn //función currificada
) => {
	try {
		if(!username && !email){
			throw new Error("Introduce tu usuario o email")
		}
		const result = db.transaction(async tnx => {
			const user = await getUserData(tnx, { email, username, profile_pic})
			if(!user)
				throw new Error ("Las credenciales no son válidas")
					await tnx.maybeOne(sql`
						UPDATE users
						SET profile_pic = ${newProfilePic} updated_at = now()
						WHERE (username = ${username} OR email=${email}) AND hashed_pwd=${hashed_pwd}
			`)});
		const isValidPassword = await compareFn(result.hash);
		if (!isValidPassword) {
			throw new Error("Las credenciales no son válidas");
		}
		return result

		} catch (error) {
		console.info("⛔ Error at updateProfilePic query: ", error.message);
		return false
		}
};

const getUsersGames = async (db, { userid }) => {
	try {
		if (!userid) {
			throw new Error("¡Vaya! Parece que ha habido un problemilla.");
		}
		const result = db.query(sql`
			SELECT g.sport, g.game_date, g.game_time, g.game_venue, g.game_gender, g.adapted
			FROM games as g
			INNER JOIN participants AS p
			ON g.gameid = p.g_id
			INNER JOIN users AS u
			ON u.userid = p.u_id
			WHERE p.u_id=${userid}
			`);
		return result;
	} catch (error) {
		console.info("⛔ Error at getUsersGames query: ", error.message);
		return false;
	}
};

module.exports = {
	userExists,
	createUser,
	getUserData,
	getUserByEmailOrUsername,
	updateEmail,
	getAllUsers,
	updateProfilePic,
	getUsersGames,
	}