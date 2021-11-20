const { updatePassword, correctCredentials } = require("../../queries/auth");

const passwordUpdate = (db) => async (req, res, next) => {
	const { email, password, newPassword } = req.body;
	if(!email || !password){
		return next({ error: new Error("Introduce tus credenciales actuales.")});
	}

	if (!newPassword) {
		return next({ error: new Error("Introduce tu nueva contraseña.") });
	}

	if (newPassword === password) {
		return next({error: new Error("La nueva contraseña debe ser distinta de la actual."),});
	}

	if (correctCredentials(email, password) === false) {
		return next({ error: new Error("Las credenciales no son válidas.") });
	};

	await updatePassword(db, { email, password, newPassword });

	res.status(200).json({
		success: true,
		info: "¡Contraseña cambiada!",
	});
};

module.exports = passwordUpdate
