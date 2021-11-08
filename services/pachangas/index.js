const { authorization } = require("../../middlewares/authorizer");

const router = require("express").Router();

module.exports = (db) => {
	router.get("/games", require("./getAllPachangas")(db));
	router.post("/:game", require("./postNewPachanga")(db));
	router.get("/games", authorization, require("./getUsersPachangas")(db));
	router.get("/games", authorization, require("./getFeaturedPachangas")(db));
	router.get("/games", authorization, require("./getPachangasByFilter")(db)
	);

	return router;
};
