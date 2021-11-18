const router = require("express").Router();

module.exports = (db) => {
	router.get("/confirmation/:confirmationToken", require("./confirm")(db));
	router.post("/new", require("./signup")(db));
	router.post("/login", require("./login")(db));
	router.put("/password/forgotten", require("./passwordForgotten")(db));
	router.put("/password/update", require("./passwordUpdate")(db));

	return router;
};
