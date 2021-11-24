const router = require("express").Router();
// const authorization = require("../../middlewares/authorizer");


module.exports = (db) => {
	// router.get("/", require("./getAllUsers")(db));
	router.get("/games/:userid", require("./getUsersGames")(db));
	router.get("/:userid", require("./getUserData")(db));
	// router.put("/updatepic/:userid", authorization, require("./updateProfilePic")(db));
	// router.put("/update/:userid", require("./updateUserData")(db));

	return router;
};
