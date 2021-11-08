const { jwt } = require("../helpers");

module.exports = (req, res, next) => {
	const { token } = req.cookies;

	const user = jwt.fromJWT(token);

	if (user === false) {
		return next({
			statusCode: 401,
			error: new Error("Unauthorized"),
		});
	}
	res.locals.user = user;
	next();
};
