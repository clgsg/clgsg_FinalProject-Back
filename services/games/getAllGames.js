const { getAllGames } = require("../../queries/games");

module.exports = (db, gameData) => async (req, res) => {
	const {sport, game_date, game_time,	game_level,	game_gender, adapted, game_venue, notes} = [gameData];
	const result = await getAllGames(db, {sport, game_date, game_time, game_level, game_gender, adapted, game_venue, notes});
	const page = Number(req.query.page) || 1;
	const perPage = Number(req.query.perPage) || 15;

	const { items, query } = await getAllGames(db, { page, perPage });
	const totalPages = ~~(items / perPage);


	res.status(200).json({
		resultsPerPage: perPage,
		prevPage: page - 1 ? `/games?page=${page - 1}` : null,
		currentPage: page,
		nextPage: totalPages > page ? `/games?page=${page + 1}` : null,
		totalGames: items,
		totalPages: totalPages,
		data: result,
		games: query,
	});
};
