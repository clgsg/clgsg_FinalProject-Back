const { updateProfilePic } = require("../../queries/users");

module.exports = (db) => async (req, res, next) => {
	const paramsContent = { ...req.body };

	const { username } = res.locals.user;

	const result = await updateProfilePic(db, paramsContent, username);

	if (result === false) {
		return next({
			status: 500,
			message: new Error("¡Vaya! Parece que ha habido un problemilla"),
		});
	}

	res.status(200).json({
		status: true,
		data: {
			new_profile_pic: res.profile_pic,
		},
	});
};
