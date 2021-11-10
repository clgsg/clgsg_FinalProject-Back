const transporter = require("../../config/mailer");

const { forgottenPassword } = require("./index");

const sendForgotttenPassword = async ({ to, token }) => {
	try {
		const template = forgottenPassword({ to, token });
		return await transporter.sendMail(template);
	} catch (e) {
		console.info('> Error at "sendForgotttenPassword" helper: ', e.message);
		return false;
	}
};

module.exports = {
	sendForgotttenPassword,
};
