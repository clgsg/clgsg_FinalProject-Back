const authorization = require("../../middlewares/authorizer");

const router = require("express").Router();

module.exports = (db) => {
	router.get("/:gameid", authorization, require("./getParticipantsByGameID")(db));
	router.put("/:userid", authorization, require("./updateParticipants")(db));

	return router;
};
