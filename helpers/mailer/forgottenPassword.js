const transporter = require("../../config/mailer");

const { forgottenPassword } = require("./index");

const sendForgotttenPassword = async ({ email, token }) => {
	try {
		const template = forgottenPassword({ email, token });
		return await transporter.sendMail(template);
	} catch (e) {
		console.info("⛔ Error at sendForgotttenPassword helper: ",
			e.message
		);
		return false;
	}
};

module.exports = {
	sendForgotttenPassword,
};
