const { sql } = require("slonik");


const newGame = async (db, {sport, game_date="", game_time="", game_level="", game_gender="", adapted="", game_venue="", notes=""}) => {
	try {
		const result = await db.one(sql`
			INSERT INTO games (sport, game_date, game_time, game_level, game_gender, adapted, game_venue, notes)
			VALUES(${sport}, ${game_date}, ${game_time}, ${game_level}, ${game_gender}, ${adapted}, ${game_venue}, ${notes});
		 `);
		return result;
	} catch (error) {
		console.info("⛔ Error at newGame query: ", error.message);
		return false;
	}
};


const getAllGames = async (db) => {
	try {
		const result = await db.query(sql`
			SELECT sport, game_date, game_time, game_gender, adapted, game_venue, game_level
			FROM games
			ORDER BY game_date , game_time ;
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

const getGameInfo = async (db, gameid) => {
	try {
		const result = await db.query(sql`
		SELECT sport, game_date, game_time, game_gender, adapted, game_venue, notes
		FROM games
		WHERE gameid=${gameid};
		`);
		return result
	} catch (error) {

	}
}

// const getGamesByUsersPreferences = async (db) => {
//  	try {
//  		const result = await db.query(sql`
// 			SELECT g.game_date, g.game_venue, g.game_time, g.game_gender
// 			FROM games as g
// 			INNER JOIN participants AS p
// 			ON g.gameid = p.g_id
// 			INNER JOIN users AS u
// 			ON u.userid = p.u_id
// 			WHERE u.username=${username} AND ${pref_sports}= ANY(u.pref_sports)
//          `);
//  		return result.rows;
//  	} catch (error) {
//  		console.info("⛔ Error at getGamesByUsersPreferences query: ", error.message);
//  		return false;
//  	}
//  };

// const getGamesByFilter = async (db) => {
// 		try {
// 			const result = await db.query(sql`
// 				SELECT sport, game_date, game_time, game_level, game_gender, adapted, game_venue
// 				FROM games
// 				WHERE game_date=${game_date}::date
// 				AND game_time BETWEEN ${game_time} AND '24:00:00'
// 				${sport && `AND sport=${sport}`}
// 				${adaptado && `AND adaptado=${adaptado}`};
//          `);

// 			return result.rows;
// 		} catch (error) {
// 			console.info("⛔ Error at getGamesByFilter query: ", error.message);
// 			return false;
// 		}
//  };

module.exports = {
	newGame,
	getAllGames,
	getUpcomingGames,
	getGameInfo,
// 	getGamesByUsersPreferences,
// 	getGamesByFilter,
	};
