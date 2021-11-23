const { getGameInfo } = require("../../queries/games");

module.exports = (db, userid) => async (req, res, next) => {
	const [result] = await getGameInfo(db, { gameid });

	if (result === false) {
		return next({
			error: new Error("No se ha encontrado información sobre esta pachanga."),
		});
	}

	res.status(200).json({
		success: "true",
		data: result,
	});
};
