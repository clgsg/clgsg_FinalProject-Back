const router = require("express").Router();
// const authorization = require("../../middlewares/authorizer");


module.exports = (db) => {
	// router.get("/", require("./getAllUsers")(db));
	router.get("/:userid/games", require("./getUsersGames")(db));
	router.get("/:userid", require("./getUserData")(db));
	// router.put("/:userid/updatepic", authorization, require("./updateProfilePic")(db));
	// router.put(":userid/update/", require("./updateUserData")(db));

	return router;
};
