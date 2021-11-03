require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const seed = async () => {
	try {
		await db.query(sql`
			DROP table IF EXISTS users CASCADE;
			DROP table IF EXISTS games CASCADE;
			DROP table IF EXISTS users_games;
			DROP table IF EXISTS venues;

			DROP EXTENSION IF EXISTS "uuid-ossp";
			CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

			DROP type IF EXISTS sports;
			DROP type IF EXISTS locations;
			DROP type IF EXISTS gen;
			DROP type IF EXISTS game_gen;
			DROP type IF EXISTS level
			`);
		console.info("Drop successful! 🚀");
	} catch (error) {
		console.info("Drop failed! ❌", error.message);
	}
};

drops();