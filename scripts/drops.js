require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const drops = async () => {
	try {
		await db.query(sql`
			DROP table IF EXISTS users CASCADE;
			DROP table IF EXISTS games CASCADE;
			DROP table IF EXISTS participants CASCADE;
			DROP table IF EXISTS venues CASCADE;

			DROP EXTENSION IF EXISTS "uuid-ossp";

			DROP type IF EXISTS sports;
			DROP type IF EXISTS venues;
			DROP type IF EXISTS usergender;
			DROP type IF EXISTS gamegender;
			DROP type IF EXISTS level;
			`);
		console.info("Drop was successful! 🚀");
	} catch (error) {
		console.info("Drop failed! ❌", error.message);
	}
};

drops();