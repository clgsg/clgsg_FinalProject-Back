const {removeParticipant} = require("../../queries/participants");

module.exports = (db, username, gameid) => async (req, res, next) => {
	await removeParticipant(db, { username, gameid });

	res.status(200).json({
		success: "true",
		message: "Ya no constas en la pachanga",
	});
};
