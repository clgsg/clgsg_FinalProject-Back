const { createUser } = require("../../queries/auth");
const { encrypt, createToken } = require("../../helpers/auth/hash");
const { sendMail } = require("../../helpers/mailer");

module.exports = (db) => async (req, res, next) => {
	console.info("Llegó: ", req.body);
	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		return next({ error: new Error("Todos los campos son obligatorios") });
	}
	// const hashed_pwd = await encrypt(password);

	// const confirmationToken = createToken();
	// console.info("Confirmation: ", confirmationToken);

	const result = await createUser(db, {
		email,
		password
	});

	if (result === false) {
		return next({ error: new Error("¡Vaya! Parece que ha habido un problemilla") });
	}

	const mailResult = await sendMail({ to: email, confirmationToken });
	console.info("Mail result: ", mailResult);

	res.status(200).json({
		success: true,
		data: {
			info: "Hemos enviado un mensaje a tu cuenta",
		},
	});
};
