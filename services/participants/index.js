const router = require("express").Router();

module.exports = (db) => {
	router.get("/:gameid", require("./getParticipants")(db));
	router.post("/:gameid/new/:userid", require("./addParticipant")(db));
	router.delete("/:gameid/remove/:username", require("./removeParticipant")(db));

	return router;
};
