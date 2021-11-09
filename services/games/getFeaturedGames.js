const { getByUsersPreferences } = require("../../queries/games");

//TODO: adaptar a preferencias del usuario
// module.exports = (db) => async (req, res, next) => {
// 	const { category } = req.query;

// 	const result = await getByUsersPreferences(db, { search, category });

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
