const {newGame} = require("../../queries/games")

module.exports = (db, gameData ) => async (req, res, next) => {
	const {sport, game_date, game_time, game_level, game_gender, adapted, game_venue, notes}= [gameData]
	const result = await newGame(db, {sport, game_date, game_time, game_level, game_gender, adapted, game_venue, notes });
	if (!sport) return new Error("Selecciona un deporte.");
	if (!game_date) return new Error("Selecciona una fecha.");
	if (game_date <= current_date)	return new Error("Selecciona una fecha posterior a hoy.");
	if (!game_time) return new Error("Selecciona una hora.");
	if (!game_level) return new Error("Selecciona un nivel.");
	if (!game_gender) return new Error("Selecciona el sexo de tus compañeros.");
	if (!adapted)
		return new Error("Selecciona si la pachanga será adaptada. Podrás indicar la adaptación en las notas.");
	if (!game_venue) return new Error("Selecciona un lugar.");
	if (result === false) {
		return next({error: new Error("¡Vaya! Parece que ha habido un problemilla")});
	}

	res.status(200).json({
		success: "true",
		data: result.data.rows,
	});
};
