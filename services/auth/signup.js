const { newUser } = require("../../queries/auth");
const {encrypt} = require('../../helpers/auth/hashed_pwd')


module.exports = (db) => async (req, res, next) => {
	const {email, username, password} = req.body

	if (!email || !username || !password) {
		return next({
			error: new Error("Todos los campos son obligatorios."),
		})};
	const hashed_pwd = await encrypt(password)
	const result = await newUser(db, {email, username, hashed_pwd})
	if (!result || result === false) {
		return next({
			statusCode: 400,
			error: new Error("Ha habido un fallo de identificación"),
		});
	}

	res.status(200).json({
		success: true,
		message:
			"'Güélcom' a Megustalapachanga",
		data: {
			info: "Ya puedes completar tu perfil y crear e inscribirte a pachangas",
		},
	});
};
