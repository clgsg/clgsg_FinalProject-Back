const router = require("express").Router();

module.exports = (db) => {
	router.use("/", require("./")(db));
	router.use("/", require("./auth")(db));
	router.use("/", require("./filter")(db));
	router.use("/", require("./games")(db));
	router.use("/", require("./users")(db));

	return router;
};
