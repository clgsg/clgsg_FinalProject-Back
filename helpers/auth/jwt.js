const jwt = require("jsonwebtoken");

const toJWT = (email, username) => {
	return jwt.sign({ email, username }, process.env.JWT_SECRET);
};

const fromJWT = (accessToken) => {
	try {
		return jwt.verify(accessToken, process.env.JWT_SECRET);
	} catch (error) {
		console.info("⛔ Error at fromJWT helper: ", error);
		return false;
	}
};

module.exports = { toJWT, fromJWT };
