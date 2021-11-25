
const router = require("express").Router();

module.exports = (db) => {
	router.get("/:gameid", require("./getParticipants")(db));
	router.post("/:gameid/:username", require("./addParticipant")(db));

	return router;
};
