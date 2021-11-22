const { updateEmail, correctCredentials } = require("../../queries/auth");

const emailUpdate = (db) => async (req, res, next) => {
	const { email, password, newEmail } = req.body;
	if (!email || !password) {
		return next({
			error: new Error("Introduce tus credenciales actuales."),
		});
	}

	if (!newEmail) {
		return next({ error: new Error("Introduce tu nueva contraseña.") });
	}

	if (newEmail === password) {
		return next({
			error: new Error(
				"La nueva contraseña debe ser distinta de la actual."
			),
		});
	}

	if (correctCredentials(email, password) === false) {
		return next({ error: new Error("Las credenciales no son válidas.") });
	}

	await updateEmail(db, { email, password, newEmail });

	res.status(200).json({
		success: true,
		info: "¡Contraseña cambiada!",
	});
};

module.exports = emailUpdate;
