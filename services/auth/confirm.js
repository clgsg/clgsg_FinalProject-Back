// const { confirmUser } = require("../../queries/auth");
// const { sendMail } = require("../../config/mailer");

// module.exports = (db) => async (req, res, next) => {
// 	const { confirmationToken } = req.params;

// 	const [result] = await confirmUser(db, { confirmationToken });
// 	if (!confirmationToken) {
// 		return next({ error: new Error("¡Vaya! Parece que ha habido un problemilla") });
// 	}
// 	if (!result || result === false) {
// 		return next({
// 			statusCode: 400,
// 			error: new Error("Ha habido un fallo de identificación"),
// 		});
// 	}
// 	await sendMail.confirmation({
// 		to: result.email,
// 		username: result.username,
// 	});

// 	res.status(200).json({
// 		success: true,
// 		message: "Cuenta activada. Se ha enviado un mensaje a tu cuenta de email",
// 		data: {
// 			info: "¡Has activado tu cuenta!"
// 		}
// 	});
// };
