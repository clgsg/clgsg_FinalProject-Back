const { signup } = require("../../queries/auth");


module.exports = (db) => async (req, res, next) => {

	const {email, username, password} = req.body

	const result = await signup(db, {email, username, password})
	if (!email || !password || !username) {
		return next({
			error: new Error("Todos los campos son obligatorios."),
		})};
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
