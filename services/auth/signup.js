const { createUser } = require("../../queries/auth");
const { hash } = require("../../helpers");
const { sendMail } = require("../../config/mailer");

module.exports = (db) => async (req, res, next) => {
	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		return next({ error: new Error("All fields are mandatory") });
	}

	const pass = await hash.encrypt(password);
	const token = await hash.createConfirmToken();
	const result = await createUser(db, { email, username, hash: pass, token });
	if (result === false) {
		return next({
			statusCode: 400,
			error: new Error("Username or email already in use"),
		});
	}

	await sendMail.activation({ to: email, token });

	res.status(200).json({
		success: true,
		message: "Confirmation token sent to user's email",
	});
};
