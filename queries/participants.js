const getParticipants = async (db, { gameid }) => {

	try {
		const result = await db.query(sql`
			SELECT u.username
			FROM games as g
			INNER JOIN participants AS p
			ON g.gameid = p.g_id
			INNER JOIN users AS u
			ON u.userid = p.u_id
			WHERE g.gameid=${gameid}
         `);
		return result.rows;
	} catch (error) {
		console.info("⛔ Error at getParticipants query: ", error.message);
		return false;
	}
};

const updateParticipants = async (db, { userid, gameid }) => {

	try {
		const result = await db.query(sql`
			INSERT INTO participants (u_id, g_id)
			VALUES (${userid}, ${gameid})
         `);
		return result.rows;
	} catch (error) {
		console.info("⛔ Error at updateParticipants query: ", error.message);
		return false;
	}
};


module.exports = {
	getParticipants,
	updateParticipants,
}