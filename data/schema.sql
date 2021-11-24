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

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE type sports AS ENUM('3x3', 'baloncesto', 'fútbol', 'fútbol 7', 'fútbol sala', 'pádel', 'tenis', 'otro');
CREATE type usergender AS ENUM('Hombre', 'Mujer');
CREATE type gamegender AS ENUM('Masculino', 'Femenino', 'Mixto');
CREATE type level AS ENUM('Básico', 'Intermedio', 'Competición');

CREATE table IF NOT EXISTS users(
	userid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	username VARCHAR(15) UNIQUE NOT NULL,
	first_name TEXT,
	family_name TEXT,
	email TEXT UNIQUE NOT NULL,
	hashed_pwd TEXT NOT NULL,
	user_gender usergender,
	birth_date DATE,
	pref_sports sports[],
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
	game_level level NOT NULL,
	game_gender gamegender NOT NULL,
	adapted BOOLEAN NOT NULL DEFAULT false,
	notes TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
	updated_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);

CREATE table IF NOT EXISTS participants(
	u_id uuid references users(userid),
	g_id INTEGER references games(gameid),
	participants_id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1020) PRIMARY KEY
);


