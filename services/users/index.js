const router = require("express").Router();
const { authorization } = require("../../middlewares/authorizer");


module.exports = (db) => {
	router.get("/getallusers", require("./getAllUsers")(db));
	router.get("/participants", require("./getUsersByGame")(db));
	router.get("/:userid", require("./getUserData")(db));
	router.put("/update/:userid", authorization ,require("./updateUser")(db));

	return router;
};
