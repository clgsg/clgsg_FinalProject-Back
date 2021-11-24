const { login } = require("../../queries/auth");

module.exports = (db) => async (req, res, next) => {

	const { email, username, password } = req.body;

	if (!username && !email && !password) {
		return next({ error: new Error("Introduce tus credenciales") });
	}

	if (!username && !email) {
		return next({ error: new Error("Introduce tu email y usuario") });
	}
	if (!password) {
		throw new Error("Introduce tu contraseña");
	}
	if (!result || result === false) {
		return next({
			statusCode: 400,
			error: new Error("Ha habido un fallo de identificación"),
		});
	}
	const result = await login(db, { email, username, password });

	res.status(200).json({
		success: true,
		message: "'Güélcom' a Megustalapachanga",
		data: {
			info: "¿Ya sabes a qué quieres jugar?",
		},
	});
};

