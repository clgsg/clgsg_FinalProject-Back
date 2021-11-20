const router = require("express").Router();

module.exports = (db) => {
	// router.get("/confirmation/:confirmationToken", require("./confirm")(db));
	router.post("/signup", require("./signup")(db));
	router.get("/login", require("./login")(db));
	// router.put("/password/forgotten", require("./passwordForgotten")(db));
	router.put("/password/update", require("./passwordUpdate")(db));

	return router;
};
