const router = require("express").Router();

module.exports = (db) => {
	router.get("/", (req, res) => res.send("Funciona"))
	router.use("/auth", require("./auth")(db));
	router.use("/games", require("./games")(db));
	router.use("/participants", require("./participants")(db))
	router.use("/users", require("./users")(db));
	router.use("/venues", require("./venues")(db));

	return router;
};
