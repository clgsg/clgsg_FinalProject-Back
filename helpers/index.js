const { encrypt, compare, createToken } = require("./auth/hash");
const { toJWT, fromJWT } = require("./auth/jwt");

const serialize = (res, { email, username }) => {
	const accessToken = toJWT(email, username);
	return accessToken;
};

const deserialize = req => {
	const {token} = req.cookies
 	return fromJWT(token);
};

module.exports = {
	serialize,
	hashed_pwd: { encrypt, compare, createToken },
	deserialize,
};
