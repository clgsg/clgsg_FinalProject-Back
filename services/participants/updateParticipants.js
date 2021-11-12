const { updateParticipants, getParticipants } = require("../../queries/participants");

module.exports = (db) => async (req, res, next) => {
	await updateParticipants(db, {userid, gameid});

	//todo: ejecución de getParticipants que devuelva la lista actualizada de participantes
	const result = getParticipants(db, {game_participants});

	if (result === false) {
		return next({
			statusCode: 404,
			error: new Error("No se han encontrado participantes"),
		});

	return result;
	}
	res.status(200).json({
		success: "true",
		data: result,
	});
};