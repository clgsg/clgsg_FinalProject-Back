const usernameToUserid = async (db, username) => {
	try {
		const result = await db.one(sql`
		SELECT userid
		FROM users
		WHERE username=${username}
		`);
		return result;
	} catch (error) {
		console.info("⛔ Error at usernameToUserid query: ", error.message);
		return false;
	}
};



const checkIfGameInTable = async (db, { userid, gameid }) => {
	await db.query(sql`
		SELECT
			CASE
				WHEN g_id=${gameid}
				THEN
					${gameInCrossTable}
				ELSE
					(
					INSERT INTO participants (u_id, g_id)
					VALUES ('${userid}', ${gameid})
					);
			END CASE;
		FROM participants;
	`);
};


module.exports = {
	usernameToUserid,
	checkIfGameInTable,
}