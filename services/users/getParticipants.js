const { getParticipants } = require("../../queries/users");


module.exports = (db) => async (req, res, next) => {

	const result = await getParticipants(db, {gameid});

	if (result === false) {
		return next({
			statusCode: 404,
			error: new Error("No se han encontrado participantes"),
		});
	}

	res.status(200).json({
		success: "true",
		data: result,
	});
};