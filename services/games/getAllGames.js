const { getAllGames } = require("../../queries/games");

module.exports = (db) => async (req, res) => {
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

		games: query,
	});
};
