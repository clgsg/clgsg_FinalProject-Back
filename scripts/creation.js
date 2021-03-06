require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const creation = async () => {
	try {
		await db.query(sql`
			CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

			CREATE type sports AS ENUM('3x3', 'baloncesto', 'fútbol', 'fútbol 7', 'fútbol sala', 'pádel', 'tenis', 'otro');
			CREATE type usergender AS ENUM('Hombre', 'Mujer');
			CREATE type gamegender AS ENUM('Masculino', 'Femenino', 'Mixto');
			CREATE type level AS ENUM('Básico', 'Intermedio', 'Competición');

			CREATE table IF NOT EXISTS users(
				userid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
				username VARCHAR(15) UNIQUE NOT NULL,
				first_name TEXT NOT NULL,
				family_name TEXT NOT NULL,
				email TEXT UNIQUE NOT NULL,
				hashed_pwd TEXT NOT NULL,
				user_gender usergender NOT NULL,
				birth_date DATE NOT NULL,
				user_level userlevel NOT NULL,
				pref_sports sports[] NOT NULL,
				profile_pic TEXT,
				access_token TEXT,
				activation_token TEXT,
				created_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
				updated_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
			);

			CREATE TABLE IF NOT EXISTS venues (
			venue_name TEXT NOT NULL UNIQUE PRIMARY KEY,
			venue_address TEXT NOT NULL,
			facilities TEXT
			);

			CREATE table IF NOT EXISTS games(
				gameid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
				created_by varchar REFERENCES users(username),
				sport sports NOT NULL,
				game_venue TEXT NOT NULL REFERENCES venues(venue_name),
				game_date DATE NOT NULL,
				game_time TIME NOT NULL,
				game_level gamelevel NOT NULL,
				game_gender gamegender NOT NULL,
				adapted BOOLEAN NOT NULL DEFAULT false,
				notes TEXT,
				created_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
				updated_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
			);


			CREATE table IF NOT EXISTS participants(
				u_id uuid references users(userid),
				g_id INTEGER references games(gameid),
				participants_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY
			);
		`);
		console.info("Creation was successful! 🚀");
	} catch (error) {
		console.info("Creation failed! ❌", error.message);
	}
};

creation()