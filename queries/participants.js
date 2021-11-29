const { sql } = require("slonik");
const {usernameToUserid} = require("../helpers/participantshelpers")


const getParticipants = async (db, { gameid }) => {
	try {
		const result = await db.query(sql`
			SELECT u.username
			FROM users as u
			INNER JOIN participants AS p
			ON u.userid = p.u_id
			INNER JOIN games AS g
			ON g.gameid = p.g_id
			WHERE g.gameid=${gameid}
         `);
		return result.rows;
	} catch (error) {
		console.info("⛔ Error at getParticipants query: ", error.message);
		return false;
	}
};

const isAParticipant = async (db, username, gameid) => {
	const thisUser = usernameToUserid(username);
	try {
		await db.query(sql`
		SELECT *
		FROM participants
		WHERE u_id=${thisUser} AND g_id=${gameid}
		`)
	} catch (error) {
		console.info("⛔ Error at isAParticipant query: ", error.message);
		return false;
	}
}

const addParticipantIfNotInGame = async (db, username, gameid ) => {
	const thisUser = usernameToUserid(username);
	try {
		await db.query(sql`
			INSERT INTO participants (u_id, g_id)
			VALUES ('${thisUser}', ${gameid})
			`);
	} catch (error) {
		console.info("⛔ Error at addParticipantIfNotInGame query: ", error.message);
		return false;
	}
};

const removeParticipant = async (db, username, gameid) => {
	const thisUser = usernameToUserid(username);
	try {
		await db.query(sql`
			DELETE FROM users
			WHERE u_id=${thisUser} AND g_id=${gameid}
			`);
	} catch (error) {
		console.info(
			"⛔ Error at removeParticipant query: ",
			error.message
		);
		return false;
	}
};

module.exports = {
	getParticipants,
	isAParticipant,
	addParticipantIfNotInGame,
	removeParticipant,
};