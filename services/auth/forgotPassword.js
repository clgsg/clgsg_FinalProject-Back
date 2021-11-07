const { hash } = require("../../helpers");
const { sendMail } = require("../../config/mailer");
const { getUserData } = require("../../queries/user");
const { updateToken } = require("../../queries/auth");

const passwordForgotten = (db) => async (req, res, next) => {
	const { email, username } = req.body;

	if (!email && !username) {
		return next({ error: new Error("Please provide your email or username") });
	}

	const user = await getUserData(db, { email, username });

	if (!user) {
		return next({ error: new Error("Are you sure your data are correct?") });
	}

	const token = await hash.createConfirmToken();

	const newToken = await updateToken(db, token, { email, username });

	if (!newToken) {
		return next({ error: new Error("Something went wrong") });
	}

	await sendMail.passwordUpdate({ email: user.email, token });

	res.status(200).json({
		success: true,
		info: "Email has been sent.",
	});
};

module.exports = passwordForgotten;
