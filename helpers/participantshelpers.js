//Todo: crear función que compruebe que un mismo userid no esté apuntado más de una vez a un gameid
const addUserIfNotInGame = async (db, {userid, gameid}) => {
	// const isParticipant = return new Error('Ya constas como participante en esta pachanga')
	await db.query(sql`
		SELECT
			CASE
				WHEN
					u_id ='${userid}' AND g_id=${gameid}
				THEN
					${isParticipant}  //todo: devolver mensaje 'Ya constas como participante en esta pachanga'
				ELSE
					(
					INSERT INTO participants (u_id, g_id)
					VALUES ('${userid}', ${gameid})
					);
			END CASE;
		FROM participants
	`);
}
//Todo: crear función que compare si ese id de pachanga existe en participants; si no existe, que inserte automáticamente una nueva pachanga en la tabla participants con el userid del usuario; si ya existe, que envíe mensaje al usuario "ya estás inscrito"
const checkIfGameIdInTable = async (db, { userid, gameid }) => {
	// const gameInCrossTable = await new alert("")
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
