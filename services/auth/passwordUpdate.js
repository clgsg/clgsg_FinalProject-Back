const { hash } = require("../../helpers/auth/hash");
const { getByToken } = require("../../queries/auth");
const { updateUserPassword } = require("../../queries/user");

const newPassword = (db) => async (req, res, next) => {
	const { email, token } = req.query;
	const { password } = req.body;

	const userCheck = await getByToken(db, token);

	if (!userCheck || userCheck.email !== email) {
		return next({ error: new Error("Data don't match") });
	}
	const newHash = await hash.encrypt(password);

	const newUser = await updateUserPassword(db, {
		newHash,
		email: userCheck.email,
	});

	if (!newUser) {
		return next({ error: new Error("Error happened") });
	}

	res.status(200).json({
		success: true,
		info: "Password has been changed correctly.",
	});
};

module.exports = {newPassword}
