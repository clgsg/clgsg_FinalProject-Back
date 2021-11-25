const transporter = require("../../config/mailer");

const { signedUp4Game } = require("./index");

const sendSignedUp4GameMail = async ({
	email,
	username,
	sport,
	date,
	time,
	venue,
	gender,
	adapted,
	notes
}) => {
	try {
		const template = signedUp4Game({
			email,
			email,
			username,
			sport,
			date,
			time,
			venue,
			gender,
			adapted,
			notes,
		});
		return await transporter.sendMail(template);
	} catch (e) {
		console.info("⛔ Error at sendsignedUp4GameMail helper: ", e.message);
		return false;
	}
};

module.exports = {
	sendSignedUp4GameMail,
};
