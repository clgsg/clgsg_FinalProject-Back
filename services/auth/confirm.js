const { confirmUser } = require("../../queries/auth");
const { sendMail } = require("../../config/mailer");

module.exports = (db) => async (req, res, next) => {
	const { confirmationToken } = req.params;

	const [result] = await confirmUser(db, { confirmationToken });
	if (!confirmationToken) {
		return next({ error: new Error("Something went wrong") });
	}
	if (!result || result === false) {
		return next({
			statusCode: 400,
			error: new Error("Invalid token"),
		});
	}
	await sendMail.confirmation({
		to: result.email,
		username: result.username,
	});

	res.status(200).json({
		success: true,
		message: "Account activated, email sent to user",
		data: {
			info: "Your accopunt has been activated!"
		}
	});
};
