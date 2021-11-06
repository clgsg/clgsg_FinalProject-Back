require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const drops = async () => {
	try {
		await db.query(sql`




			`);
		console.info("Drop was successful! 🚀");
	} catch (error) {
		console.info("Drop failed! ❌", error.message);
	}
};

drops();