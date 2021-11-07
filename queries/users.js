const { sql } = require("slonik");
//? comprobar y actualizar qué datos podrán actualizarse en el perfil
// const updateUser = async (db, paramsContent, userNameRes) => {
// 	const { email, first_name, family_name, username } =
// 		paramsContent;
// 	try {
// 		return await db.query(sql`
// 		UPDATE users
//             SET name = ${first_name}, surname = ${family_name}, email = ${email} , username = ${username}
//             WHERE username = ${userNameRes}`);
// 	} catch (error) {
// 		console.info("> error at 'upDateUser' query: ", error.message);
// 		return false;
// 	}
// };

const getUserData = async (db, { email, username }) => {
	let whereClause = "";
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
		console.info("Error at getUserData:", error.message);
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
		console.info("Error at updateUserPassword query:", error.message);
		return false;
	}
};

module.exports = {
	updateUser,
	getUserData,
	updateUserPassword,
};
