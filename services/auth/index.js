const router = require("express").Router();

module.exports = (db) => {
	// router.get("/confirmation/:confirmationToken", require("./confirm")(db));
	router.post("/signup", require("./signup")(db));
	router.post("/login", require("./login")(db));
	// router.put("/pwd/forgotten", require("./passwordForgotten")(db));
	router.put("/pwd/update", require("./passwordUpdate")(db));
	// router.put("/pwd/forgotten", require("./passwordForgotten")(db));
	router.put("/email/update", require("./emailUpdate"))

	return router;
};
