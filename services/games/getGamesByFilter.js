const { getGamesByFilter } = require("../../queries/games");

module.exports = (db) => async (req, res, next) => {
	const { sport, adapted, game_date, game_time, game_gender, game_venue } = req.query;

	const result = await getGamesByFilter(db, { sport, adapted, game_date, game_time, game_gender, game_venue });

	if (result === false) {
		return next({
			statusCode: 404,
			error: new Error("No se han encontrado resultados"),
		});
	}

	res.status(200).json({
		success: "true",
		data: result,
	});
};
