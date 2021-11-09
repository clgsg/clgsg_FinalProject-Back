const { encrypt, compare, createToken } = require("./auth/hash");
const { toJWT, fromJWT } = require("./auth/jwt");

const serialize = (res, { email, username }) => {
	const accessToken = toJWT(email, username);
	return accessToken;
};

const deserialize = (token) => {
	return fromJWT(token);
};

module.exports = {
	serialize,
	hash: { encrypt, compare, createToken },
	deserialize,
};
