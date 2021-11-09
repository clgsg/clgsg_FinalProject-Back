const transporter = require("../../config/mailer");

const { confirmation } = require("./index");

const sendConfirmationMail = async ({ to, token }) => {
	try {
		const template = confirmation({ to, token });
		return await transporter.sendMail(template);
	} catch (e) {
		console.info('> Error at "sendConfirmationMail" helper: ', e.message);
		return false;
	}
};

module.exports = {
	sendConfirmationMail,
};
