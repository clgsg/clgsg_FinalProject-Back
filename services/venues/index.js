const router = require("express").Router();

module.exports = (db) => {
	router.get("/info", require("./getVenueInfo")(db));
	router.get("/get/:venue_name", require("./getVenueByName")(db));

	return router;
};
