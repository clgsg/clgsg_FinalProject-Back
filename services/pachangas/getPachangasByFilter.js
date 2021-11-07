const { getBySearch } = require("../../queries/products");

//TODO: adaptar a filtros
// module.exports = (db) => async (req, res, next) => {
// 	const { search, category } = req.query;

// 	const result = await getBySearch(db, { search, category });

// 	if (result === false) {
// 		return next({
// 			statusCode: 404,
// 			error: new Error("No results found"),
// 		});
// 	}

// 	res.status(200).json({
// 		success: "true",
// 		data: result,
// 	});
// };
