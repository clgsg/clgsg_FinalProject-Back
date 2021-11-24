const { getUpcomingGames } = require("../../queries/games");


module.exports = (db) => async (req, res, next) => {

	const result = await getUpcomingGames(db);

	if (result === false) {
		return next({
			error: new Error("No se han encontrado pachangas próximas"),
		});
	}

	res.status(200).json({
		success: "true",
		data: result,
	});
};
