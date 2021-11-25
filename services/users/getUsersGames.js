const { getUsersGames } = require("../../queries/users");

module.exports = (db) => async (req, res, next) => {

	const { userid } = req.query;
	const result = await getUsersGames(db, { userid });

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
