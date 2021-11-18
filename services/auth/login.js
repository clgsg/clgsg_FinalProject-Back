const { hash, serialize} = require("../../helpers");
const { getUserByEmailOrUsername } = require("../../queries/users");

const login = (db) => async (req, res, next) => {
	const { email, username, password } = req.body;

	if ((!email && !username) || !password) {
		return next({ error: new Error("¿Seguro que esos son tus datos de acceso?") });
	}

	const user = await getUserByEmailOrUsername(
		db,
		email,
		username,
		hash.compare(password)
	);
		console.log(user)
	if (!user) {
		return next({ error: new Error("¡Vaya! Parece que ha habido un problemilla") });
	}

	const token = serialize(res, {
		email: user.email,
		username: user.username,
	});
		console.log(token)
	res.status(200).json({
		success: true,
		data: { access_token: token },
	});
};

module.exports = login;
