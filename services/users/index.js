const router = require("express").Router();
const { authorization } = require("../../middlewares/authorizer");


module.exports = (db) => {
	router.get("/gallusers", require("./getAllUsers")(db));
	// router.get("/participants/:gameid", require("./getUsersByGame")(db));
	router.get("/gdata/:userid", require("./getUserData")(db));
	// router.put("/update/:userid", authorization ,require("./updateUser")(db));

	return router;
};
