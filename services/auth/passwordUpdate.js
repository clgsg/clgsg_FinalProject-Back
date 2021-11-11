const { hash } = require("../../helpers/auth/hash");
const { getUserByToken } = require("../../queries/auth");
const { updateUserPassword } = require("../../queries/users");

const newPassword = (db) => async (req, res, next) => {
	const { email, token } = req.query;
	const { password } = req.body;

	const userCheck = await getUserByToken(db, token);

	if (!userCheck || userCheck.email !== email) {
		return next({ error: new Error("Las credenciales no son válidas") });
	}
	const newHash = await hash.encrypt(password);

	const newUser = await updateUserPassword(db, {
		newHash,
		email: userCheck.email,
	});

	if (!newUser) {
		return next({ error: new Error("¡Vaya! Parece que ha habido un problemilla") });
	}

	res.status(200).json({
		success: true,
		info: "¡Contraseña cambiada!",
	});
};

module.exports = newPassword
