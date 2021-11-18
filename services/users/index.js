const router = require("express").Router();
const authorization = require("../../middlewares/authorizer");


module.exports = (db) => {
	router.post("/new", authorization, require("./createUser")(db));
	router.get("/", require("./getAllUsers")(db));
	router.get("/games/:userid", authorization, require("./getUsersGames")(db));
	router.get("/:userid", authorization, require("./getUserData")(db));
	router.put("/updatepic/:userid", authorization ,require("./updateProfilePic")(db));
	router.put("/update/:userid", authorization, require("./updateUserData")(db));

	return router;
};
