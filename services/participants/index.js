
const router = require("express").Router();

module.exports = (db) => {
	// router.get("/:gameid", authorization, require("./getParticipantsByGameID")(db));
	router.put("/:gameid/:userid", require("./updateParticipants")(db));

	return router;
};
