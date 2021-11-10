const { createUser } = require("../../queries/auth");
const { encrypt, createActivationToken } = require("../../helpers/hash");
const { sendMail } = require("../../helpers/mailer");

module.exports = (db) => async (req, res, next) => {
	const { email, username, password } = req.body;
	console.info("Data: ", email, username, password);

	if (!email || !username || !password) {
		return next({ error: new Error("All fields are mandatory") });
	}
	const hashed_pwd = await encrypt(password);

	const confirmationToken = createActivationToken();
	console.info("Confirmation: ", confirmationToken);

	const result = await createUser(db, {
		email,
		username,
		hashed_pwd,
		confirmationToken,
	});

	if (result === false) {
		return next({ error: new Error("Something went wrong") });
	}

	const mailResult = await sendMail({ to: email, confirmationToken });
	console.info("Mail result: ", mailResult);

	res.status(200).json({
		success: true,
		data: {
			info: "Message sent successfully",
		},
	});
};
