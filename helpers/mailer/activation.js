const transporter = require("../../config/mailer");

const {activation}= require( "./index")

const sendActivationMail = async ({ email, token }) => {
	try {
		const template = activation({ email, token });
		return await transporter.sendMail(template);
	} catch (e) {
		console.info("⛔ Error at sendActivationMail helper: ", e.message);
		return false;
	}
};

module.exports = {
	sendActivationMail,
};
