const { getParticipants } = require("../../queries/participants");


module.exports = (db, gameid) => async (req, res, next) => {

	const result = await getParticipants(db, {gameid});

	if (result === false) {
		return next({
			error: new Error("No se han encontrado participantes"),
		});
	}

	res.status(200).json({
		success: "true",
		data: result,
	});
};