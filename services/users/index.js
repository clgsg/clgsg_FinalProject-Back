const router = require("express").Router();
const { authorization } = require("../../middlewares/authorizer");


module.exports = (db) => {
	// router.get("/getall", require("./getAllUsers")(db));
	// router.get("/participants/:gameid", authorization, require("./getUsersByGame")(db));
	// router.get("/participants/:userid", authorization, require("./getusersGames")(db))
	// router.get("/getdata/:userid", authorization, require("./getUserData")(db));
	// router.put("/update/:userid", authorization ,require("./updateUser")(db));

	return router;
};
