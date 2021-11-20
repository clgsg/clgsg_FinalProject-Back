const { getParticipants, isAParticipant, addParticipantIfNotInGame} = require("../../queries/participants");


module.exports = (db, username, gameid) => async (req, res, next) => {

	const alreadyIn = isAParticipant({username, gameid})
	if (alreadyIn) {
			await new Error("Ya constas como participante en esta pachanga.");
		}

	await addParticipantIfNotInGame(db, {username, gameid});

	const result = getParticipants(db, {gameid});

	if (result === false) {
		return next({
			error: new Error("¡Vaya! No se han encontrado participantes para esta pachanga."),
		});
	}

	res.status(200).json({
		success: "true",
		message: "Inscripción correcta",
		data: result.rows,
	});
};