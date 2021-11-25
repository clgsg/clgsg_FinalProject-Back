// const { jwt } = require("../helpers/auth/jwt");

// module.exports = (req, res, next) => {
// 	const { token } = req.cookies;

// 	const user = jwt.fromJWT(token);

// 	if (user === false) {
// 		return next({
// 			statusCode: 401,
// 			error: new Error("No autorizado"),
// 		});
// 	}
// 	res.locals.user = user;
// 	next();
// };
