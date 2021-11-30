const router = require("express").Router();

module.exports = (db) => {
	// router.get("/confirmation/:confirmationToken", require("./confirm")(db));
	router.post("/signup", require("./signup")(db));
	router.post("/login", require("./login")(db));
	router.post("/pwd/update", require("./passwordUpdate")(db));
	router.post("/pwd/forgotten", require("./passwordForgotten")(db));
	router.post("/email/update", require("./emailUpdate"))

	return router;
};
