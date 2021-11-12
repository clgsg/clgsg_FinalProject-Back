const { authorization } = require("../../middlewares/authorizer");

const router = require("express").Router();

module.exports = (db) => {
	router.get("/allgames", require("./getAllGames")(db));
	router.post("/new/:gameid", require("./createGame")(db));
	router.get("/byuserspreferences", authorization, require("./getGamesByUsersPreferences")(db));
	router.get("/filtered", authorization, require("./getGamesByFilter")(db));

	return router;
};
