const { createUser } = require("../../queries/users");
const { sendMail } = require("../../config/mailer");

module.exports = (db) => async (req, res, next) => {
	const { confirmationToken } = req.params;

	const [result] = await createUser(db, { confirmationToken });
	if (!confirmationToken) {
		return next({
			error: new Error("¡Vaya! Parece que ha habido un problemilla"),
		});
	}
	if (!result || result === false) {
		return next({
			statusCode: 400,
			error: new Error("Ha habido un fallo de identificación"),
		});
	}

	await sendMail.activation({
		to: result.email,
		username: result.username,
	});

	res.status(200).json({
		success: true,
		message:
			"'Güélcom' a Megustalapachanga",
		data: {
			info: "Accede a tu cuenta para completar tu perfil y crear e inscribirte a pachangas",
		},
	});
};
