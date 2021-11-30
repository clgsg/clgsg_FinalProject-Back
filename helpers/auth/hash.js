const bcrypt = require("bcrypt");
const crypto = require("crypto");

const encrypt = async password => {
	console.log("password:", password)
	const rounds = Number(process.env.SALT);
	const salt = await bcrypt.genSalt(rounds);
	return await bcrypt.hash(password, salt);
};

const compare = (password) => async (hashed_pwd) => {
	return await bcrypt.compare(password, hashed_pwd);
};

const createToken = async () => {
	return crypto.randomBytes(32).toString("hex");
};

module.exports = {
	encrypt,
	compare,
	createToken,
};
