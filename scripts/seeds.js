require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const seed = async () => {
	try {
		await db.query(sql`






			`);
		console.info("Insertion was successful! 🚀");
	} catch (error) {
		console.info("Insertion failed! ❌", error.message);
	}
};

seed();
