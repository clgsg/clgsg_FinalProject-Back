const { getParticipants } = require("../../queries/users");

module.exports = (db) => async (req, res, next) => {

	const { gameid } = req.query;
	const result = await getParticipants(db, { gameid });

	if (result === false) {
		return next({
			statusCode: 404,
			error: new Error("No tienes pachangas en el horizonte"),
		});
	}

	res.status(200).json({
		success: "true",
		data: result,
	});
};
