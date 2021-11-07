const { hash, serialize } = require("../../helpers");
const { getUserByEmailOrUsername } = require("../../queries/auth");

const login = (db) => async (req, res, next) => {
	const { email, username, password } = req.body;

	if ((!email && !username) || !password) {
		return next({ error: new Error("Given data failed") });
	}

	const user = await getUserByEmailOrUsername(
		db,
		email,
		username,
		hash.compare(password)
	);

	if (!user) {
		return next({ error: new Error("Something went wrong") });
	}

	const token = serialize(res, {
		email: user.email,
		username: user.username,
	});

	res.status(200).json({
		success: true,
		data: { access_token: token },
	});
};

module.exports = login;
