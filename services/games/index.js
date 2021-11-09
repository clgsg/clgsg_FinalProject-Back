const { authorization } = require("../../middlewares/authorizer");

const router = require("express").Router();

module.exports = (db) => {
	router.get("/games", require("./getAllGames")(db));
	router.post("/:game", require("./createGame")(db));
	router.get("/games", authorization, require("./getUsersGames")(db));
	router.get("/games", authorization, require("./getFeaturedGames")(db));
	router.get("/games", authorization, require("./getGamesByFilter")(db)
	);

	return router;
};
