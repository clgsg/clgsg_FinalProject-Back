DROP table IF EXISTS users CASCADE;
DROP table IF EXISTS games;
DROP table IF EXISTS users_games;
DROP table IF EXISTS venues;

DROP EXTENSION IF EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP type IF EXISTS sports;
DROP type IF EXISTS locations;
DROP type IF EXISTS gen;
DROP type IF EXISTS level;

CREATE type sports AS ENUM('3x3', 'baloncesto', 'fútbol', 'fútbol 7', 'fútbol sala', 'pádel', 'tenis', 'otro');
CREATE type locations AS ENUM('Madrid', 'Ávila', 'Segovia'
);
CREATE type gen AS ENUM('Hombre', 'Mujer');
CREATE type level AS ENUM('Básico', 'Intermedio', 'Competición');

CREATE table IF NOT EXISTS users(
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	username TEXT UNIQUE NOT NULL,
	first_name TEXT NOT NULL,
	family_name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	hashed_pwd TEXT NOT NULL,
	gender gen NOT NULL,
	birth DATE NOT NULL,
	level level NOT NULL,
	pref_sports sports[] NOT NULL,
	profile_pic TEXT,
	access_token TEXT,
	activation_token TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
	updated_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE table IF NOT EXISTS games(
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	created_by TEXT UNIQUE NOT NULL references users(username),
	g_date DATE NOT NULL,	--//TODO: Dar formato DD-mmm-yyyy
	g_time TIME NOT NULL,	--//TODO: Dar formato HH24:MI
	g_level level NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
	updated_at TIMESTAMP NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
	adapted BOOLEAN NOT NULL DEFAULT false,
	notes TEXT,
	participants TEXT[]  --//?¿Cómo incluir aquí los username de los participantes?
);
CREATE table IF NOT EXISTS users_games(
	gameId uuid references games(id),
	userId uuid references users(id)
);
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_name TEXT NOT NULL,
  venue_address TEXT NOT NULL,
  indoor_facilities TEXT,
  outdoor_facilities TEXT
  );


