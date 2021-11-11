const transporter = require("../../config/mailer");

const { createdGame } = require("./index");

const sendCreatedGameMail = async ({
	email,
	username,
	sport,
	date,
	time,
	venue,
	gender,
	adapted,
}) => {
	try {
		const template = createdGame({ email, token });
		return await transporter.sendMail(template);
	} catch (e) {
		console.info("⛔ Error at sendcreatedGameMail helper: ", e.message);
		return false;
	}
};

module.exports = {
	sendCreatedGameMail,
};
