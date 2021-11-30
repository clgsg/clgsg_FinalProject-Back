const { hash } = require("../../helpers");
// const { sendMail } = require("../../config/mailer");
const { getUserData } = require("../../queries/users");
const { updateToken } = require("../../queries/auth");

const passwordForgotten = (db) => async (req, res, next) => {
	const { email, username } = req.body;

	if (!email && !username) {
		return next({ error: new Error("Introduce tu usuario o email") });
	}

	const user = await getUserData(db, { email, username });

	if (!user) {
		return next({ error: new Error("¿Seguro que esos son tus datos de acceso?") });
	}

	const token = await hash.createConfirmToken();

	const newToken = await updateToken(db, token, { email, username });

	if (!newToken) {
		return next({ error: new Error("¡Vaya! Parece que ha habido un problemilla") });
	}

	// await sendMail.passwordUpdate({ email: user.email, token });

	res.status(200).json({
		success: true,
		info: "Te hemos mandado un correo electrónico",
	});
};

module.exports = passwordForgotten;
