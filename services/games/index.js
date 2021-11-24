const router = require("express").Router();

module.exports = (db) => {
	router.post("/new", require("./createGame")(db));
	router.get("/", require("./getAllGames")(db));
	router.get("/info", require("./getGameInfo")(db));
	router.get("/filtered", require("./getGamesByFilter")(db));
	router.get("/bypreferences", require("./getGamesByUsersPreferences")(db));
	router.get("/upcoming", require("./getUpcomingGames")(db));

	return router;
};
