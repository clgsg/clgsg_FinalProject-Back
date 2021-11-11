const router = require("express").Router();

module.exports = (db) => {
	router.get("/confirmation/:confirmationToken", require("./confirm")(db));
	router.post("/new", require("./signup")(db));
	router.post("/login", require("./login")(db));
	router.post("/password/forgotten", require("./passwordForgotten")(db));
	// router.post("/password/update", require("./passwordUpdate")(db));

	return router;
};
