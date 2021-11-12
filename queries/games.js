const { sql } = require("slonik");
const {getUserByToken} = require("./auth")


const createNewGame = async (db, {username, sport, game_date, game_time, game_level, game_gender, adapted, game_venue, notes}) => {
	if(!sport) return new Error("Selecciona un deporte.");
	if(!game_date) return new Error("Selecciona una fecha.");
	if(game_date <= current_date) return new Error("Selecciona una fecha posterior a hoy.")
	if (!game_time) return new Error("Selecciona una hora.");
	if (!game_level) return new Error("Selecciona un nivel.");
	if (!game_gender) return new Error("Selecciona el sexo de tus compañeros.");
	if (!adapted) return new Error("Selecciona si la pachanga será adaptada. Podrás indicar la adaptación en las notas.");
	if (!game_venue) return new Error("Selecciona un lugar.");
	try {
		const username = await db.one(sql`SELECT username FROM users WHERE userid={${getUserByToken}}`)
		const result = await db.one(sql`
			INSERT INTO games (created_by, sport, game_date, game_time, game_level, game_gender, adapted, game_venue, notes)
			VALUES(${username}, ${sport}, ${game_date}, ${game_time}, ${game_level}, ${game_gender}, ${adapted}, ${game_venue}, ${notes});
		 `);
				//todo: hacer que el id introducido en participants coincida con el de la pachanga creada.
		return result.rows;
	} catch (error) {
		console.info("⛔ Error at createNewGame query: ", error.message);
		return false;
	}
};


const getAllGames = async (db) => {
	try {
		const result = await db.query(sql`
			SELECT game_date, game_venue, game_time, game_gender
			FROM games;
		`);
		return result
	} catch (error) {
		console.info("⛔ Error at getAllGames query: ", error.message);
		return false;
	}
}

const getUpcomingGames = async (db) => {
	try {
		const result = await db.query(sql`
			SELECT sport, game_date, game_time
			FROM games
			WHERE game_date BETWEEN NOW()::TIMESTAMP AND (now()::TIMESTAMP + INTERVAL '30 days')
			ORDER BY game_date , game_time ;
		`);
		return result.rows
	} catch (error) {
		console.info("⛔ Error at getUpcomingGames query: ", error.message);
		return false;
	}

}

const getGamesByUsersPreferences = async (db) => {
 	try {
 		const result = await db.query(sql`
			SELECT g.game_date, g.game_venue, g.game_time, g.game_gender
			FROM games as g
			INNER JOIN participants AS p
			ON g.gameid = p.g_id
			INNER JOIN users AS u
			ON u.userid = p.u_id
			WHERE u.username=${username} AND ${pref_sports}= ANY(u.pref_sports)
         `);
 		return result.rows;
 	} catch (error) {
 		console.info("⛔ Error at getGamesByUsersPreferences query: ", error.message);
 		return false;
 	}
 };

const getGamesByFilter = async (db) => {
		try {
			const result = await db.query(sql`
				SELECT sport, game_date, game_time, game_level, game_gender, adapted, game_venue
				FROM games
				WHERE game_date=${game_date}::date
				AND game_time BETWEEN ${game_time} AND '24:00:00'
				${sport && `AND sport=${sport}`}
				${adaptado && `AND adaptado=${adaptado}`};
         `);

			return result.rows;
		} catch (error) {
			console.info("⛔ Error at getGamesByFilter query: ", error.message);
			return false;
		}
 };

module.exports = {
	createNewGame,
	getAllGames,
	getUpcomingGames,
	getGamesByUsersPreferences,
	getGamesByFilter,
	};
