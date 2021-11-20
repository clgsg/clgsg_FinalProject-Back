// const authorization = require("../../middlewares/authorizer");

const router = require("express").Router();

module.exports = (db) => {
	router.post("/new", require("./createGame")(db));
	router.get("/", require("./getAllGames")(db));
	// router.get("/filtered", authorization, require("./getGamesByFilter")(db));
	// router.get("/bypreferences", authorization, require("./getGamesByUsersPreferences")(db));
	// router.get("/upcoming", require("./getUpcomingGames")(db));

	return router;
};
