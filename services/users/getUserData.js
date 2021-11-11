const { getUserData } = require("../../queries/users");

module.exports = (db) => async (req, res) => {

	const { username } = req.query;
	const [result] = await getUserData(db, { username });

	res.status(200).json({
		success: true,
		data: {
			first_name: result.first_name,
			family_name: result.family_name,
			username: result.username,
			email: result.email,
			profile_pic: result.profile_pic,
			access_token: result.access_token,
			pref_sports: result.pref_sports,
			gender: result.user_gender,
			level: result.user_level
		},
	});
};
