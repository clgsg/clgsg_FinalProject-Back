const { sql } = require("slonik");


const getGamesByUsersPreferences = async (db) => {
 	try {
 		const result = await db.query(sql`
 		SELECT sport, game_date, game_time, game_level, game_venue, adapted
		FROM games AS g
		INNER JOIN users AS u
		ON u.userid =
		WHERE CAST("sport" AS text) = ${sports} AND adapted = ${adapted} AND game_level = ${game_level}
         `);
 		return result.rows;
 	} catch (error) {
 		console.info(
			"⛔ Error at getGamesByUsersPreferences query: ",
			error.message
		);
 		return false;
 	}
 };

 const getGamesByFilter = async (db) => {
		try {
			const result = await db.query(sql`
 		SELECT sport, game_date, game_time, game_level, game_venue, adapted
		FROM games AS g
		INNER JOIN users AS u
		ON u.userid =
		WHERE CAST("sport" AS text) = ${sports} AND adapted = ${adapted} AND game_level = ${game_level}
         `);
			return result.rows;
		} catch (error) {
			console.info(
				"⛔ Error at getGamesByFilter query: ",
				error.message
			);
			return false;
		}
 };
module.exports = {
	getGamesByUsersPreferences,
	getGamesByFilter,
	};