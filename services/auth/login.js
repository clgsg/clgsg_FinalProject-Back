const { checkCredentials } = require("../../queries/auth");
const {compare} = require('../../helpers/auth/hash')
const {serialize} = require('../../helpers')

module.exports = (db) => async (req, res, next) => {
	serialize(res, { email, username: result.username });
	createCookie(res, accessToken)
	const { email, username, password } = req.body;
	// const compare= password => hashed_pwd => {
	// 	return password === hashed_pwd
	// }
	if (!username && !email && !password) {
		return next({ error: new Error("Introduce tus credenciales") });
	}

	if (!username && !email) {
		return next({ error: new Error("Introduce tu email o usuario") });
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
	const result = await checkCredentials(db, { email, username, password });

	createCookie(res, 'Este es el token')
	res.status(200).json({
		success: true,
		message: "'Güélcom' a Megustalapachanga. ¿Ya sabes a qué quieres jugar?",
		data: {
			email: result.email,
			username: result.username,
			password: result.password,
		},
	});
};

