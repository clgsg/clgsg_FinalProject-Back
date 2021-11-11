const { authorization } = require("../../middlewares/authorizer");

const router = require("express").Router();

module.exports = (db) => {
	router.get("/gallgames", require("./getAllGames")(db));
	router.post("/new/:gameid", require("./createGame")(db));
	// router.get("/gusergames", authorization, require("./getUsersGames")(db));
	// router.get("/featgames", authorization, require("./getFeaturedGames")(db));
	// router.get("/filtgames", authorization, require("./getGamesByFilter")(db));

	return router;
};
