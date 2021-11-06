require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const creation = async () => {
	try {
		await db.query(sql`





		`);
		console.info("Creation was successful! 🚀");
	} catch (error) {
		console.info("Creation failed! ❌", error.message);
	}
};

creation()