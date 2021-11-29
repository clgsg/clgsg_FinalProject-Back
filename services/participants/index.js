const router = require("express").Router();

module.exports = (db) => {
	router.get("/:gameid", require("./getParticipants")(db));
	router.post("/:gameid/:username", require("./addParticipant")(db));
	router.delete("/:gameid/:username", require("./removeParticipant"))

	return router;
};
