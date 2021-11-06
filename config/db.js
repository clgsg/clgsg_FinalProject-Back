require("dotenv").config();
const slonik = require("slonik");

const slonikURL =
	process.env.NODE_ENV === "production"
		? process.env.PRODUCTION_URL
		: process.env.DB_URL;

const db = slonik.createPool(slonikURL);

module.exports = db;
