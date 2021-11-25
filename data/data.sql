INSERT INTO venues (venue_name, venue_address, facilities)
VALUES ('IDB 2.100 PAU ', 'Avda. de Cerro Milano c/v C/ Peñaranda de Bracamonte. ', 'Pista polideportiva y pista de baloncesto '),
('IDB 2.75 PAU ', 'Avda. de la Gavia c/v C/Congosto. ', 'Pista de skate '),
('IDB 3.16 PAU ', 'C/ Alto del Retiro, 13. ', 'Pista polideportiva y pista de baloncesto '),
('IDB Ademo (Arroyo Fontarrón) ', 'C/ Arroyo Fontarrón, 389 ', 'Pista de fútbol sala '),
('IDB Alameda de Osuna I ', 'C/ Balandro, 1 A ', '2 pistas de baloncesto '),
('IDB Alameda de Osuna II ', 'C/ Paseo Alameda de Osuna, 48 ', 'Pista de baloncesto y pista de fútbol sala'),
('IDB Alas ', 'C/ Alas, 8 ', 'Pista de fútbol sala y pista baloncesto '),
('IDB Albaicín ', 'C/ Albaicín, 19 ', 'Pista polideportiva '),
('IDB Albaida ', 'C/ Albaida, 3 (Parque San Blas) ', 'Pista de patinaje '),
('IDB Alcalde Martín de Alzaga ', 'C/ Alcalde Martín de Alzaga, 2,', '2 pistas de baloncesto 3x3'),
('IDB Alerce ', 'C/ Alerce, 31 - Junto M-40 ', 'Pista polideportiva '),
('IDB Alfonso XIII ', 'C/ Alfonso XIII, 136 ', '2 pistas de baloncesto. Pista de patinaje. 2 campos de bolos y petanca '),
('IDB Alhaurín ', 'C/ Alhaurín, 6 ', 'Campo de fútbol 7. Pista de baloncesto. Pista de patinaje. Pista de petanca '),
('IDB Alicún ', 'C/ Alicún, 24 ', 'Pista de baloncesto '),
('IDB Aliseda ', 'C/ Aliseda, 19 c/v Real Betis ', 'Pista polideportiva '),
('IDB Almudena ', 'C/ Nicolás Salmerón, 8 B ', 'Campo de fútbol 11 de césped artificial y pista polideportiva '),
('IDB Ambulatorio (El Paraíso) ', 'C/ Ajofrín, 8 B (Parque Ajofrín) ', 'Pista de fútbol sala y 2 pistas de baloncesto '),
('IDB Americio ', 'C/ Americio, 2 (zona verde del APE 17.01) ', 'Pista de minibaloncesto y 2 pistas de petanca '),
('IDB Ana Tutor ', 'Avda. Cardenal Herrera Oria, junto nº 216 ', 'Pista de fútbol sala y pista de patinaje'),
('IDB Andévalo ', 'C/ Andévalo, 6 ', 'Pista de fútbol sala '),
('IDB Anfevi-patinaje', 'C/ Hacienda de Pavones, 127 ', 'Pista de patinaje y en su interior una pista de hockey patines '),
('IDB Anfevi-polideportivo', 'C/ Hacienda de Pavones, 127 posterior ', 'Pista polideportiva '),
('IDB Aniceto Marinas ', 'C/ Aniceto Marinas, 106 ', 'Pista de baloncesto '),
('IDB Antonio Machado ', 'C/ Antonio Machado, 14 (PO)', '2 pistas de baloncesto 3x3 '),
('IDB Arcaute ', 'Avda. Invierno, 1 ', 'Pista polideportiva '),
('IDB Arcos de Jalón', 'C/ Arcos de Jalón, 114 c/v C/ Albericia ', 'Pista de fútbol sala. 2 pistas de baloncesto. Pista de voleibol. Pista de patinaje '),
('IDB Arequipa ', 'C/ Arequipa, 12', '2 pistas de bolos y petanca '),
('IDB Arganda ', 'C/ Arganda, 10 ', 'Pista de fútbol sala '),
('IDB Arjona ', 'C/ Concejal Francisco José Jiménez Martín, 11 ', 'Campo de fútbol 11 de tierra '),
('IDB Arroyo Belincoso', 'Frente Avenida Doctor García Tapia, 76 ', 'Pista polideportiva');





INSERT INTO users (username, first_name, family_name, email, hashed_pwd, user_gender, birth_date, user_level, pref_sports)
VALUES ('Frankl89', 'Francisco', 'Sánchez', 'fran_sanchez@yo.com', 'ksjaoa895j9', 'Hombre', '1989-03-01', 'Intermedio', ARRAY ['baloncesto', 'fútbol', 'fútbol 7']::sports[]),
('Emmy83', 'Emma', 'Martínez', 'emmy83@gmail.com', 'sakx02nsoaj', 'Mujer', '1983-01-15', 'Básico', ARRAY ['baloncesto', '3x3', 'fútbol 7']::sports[]),
('AnaIsabel', 'Ana Isabel', 'Martínez', 'anai@yo.com', 'sj192jh9saks', 'Mujer', '1990-09-22', 'Intermedio', ARRAY ['baloncesto', 'fútbol', 'fútbol 7']::sports[]),
('Tiatula49', 'María del Mar', 'Pérez', 'mmar.perez@yahoo.es', 's1kshb9aakj3', 'Mujer', '1994-10-23', 'Intermedio', ARRAY ['baloncesto', '3x3', 'fútbol 7']::sports[]),
('Estheruki', 'Esther', 'Marzo', 'est_mar@gmail.com', 'kksu40kb026', 'Mujer', '1989-07-07', 'Competición', ARRAY ['fútbol', 'fútbol sala']::sports[]),
('Karlitox', 'Carlos', 'Romero', 'cromero@yahoo.es', 'aku4kIlsig54', 'Hombre', '1998-12-11', 'Básico', ARRAY ['baloncesto', '3x3', 'fútbol 7']::sports[]),
('ErRamonchu', 'Ramón', 'Fernández', 'rfernadez@yo.com', 'a92jg9basubk', 'Hombre', '1991-02-10', 'Competición', ARRAY ['baloncesto', '3x3', 'fútbol 7']::sports[]);

INSERT INTO games (created_by, sport, game_date, game_time, game_venue, game_level, game_gender, adapted, notes)
VALUES ('Frankl89', 'baloncesto', '2021-12-19', '16:30:00', 'IDB Aniceto Marinas ', 'Básico', 'Mixto', false, ''),
('Emmy83', '3x3', '2021-12-20', '17:00:00', 'IDB Arganda ', 'Intermedio', 'Masculino', true, 'Vienen dos colegas en silla de ruedas. Son muy competitivos.'),
('AnaIsabel', 'fútbol 7', '2021-12-21', '20:00:00', 'IDB Anfevi-polideportivo', 'Competición', 'Mixto', false, ''),
('Tiatula49', 'fútbol sala', '2021-12-21', '12:00:00', 'IDB Alhaurín ', 'Básico', 'Femenino', false, 'Quedamos 15 minutos antes en la esquina del BBVA'),
('Estheruki', 'baloncesto', '2021-12-26', '17:30:00', 'IDB Arcaute ', 'Intermedio', 'Masculino', false, ''),
('Karlitox', '3x3', '2021-12-27', '20:00:00', 'IDB Arcaute ', 'Competición', 'Masculino', false, ''),
('ErRamonchu', 'fútbol', '2021-12-27', '18:00:00', 'IDB Alhaurín ', 'Básico', 'Mixto', true, 'Vienen tres personas ciegas. Los demás jugaremos con antifaz: ¡NO OLVIDES EL TUYO! Ellos traen el balón "con cascabeles"');


INSERT INTO participants (u_id, g_id)
VALUES ('7877adb5-fe86-475e-b67f-c73b37e29dc8', 2),
('7877adb5-fe86-475e-b67f-c73b37e29dc8', 7),
('39c85dd8-f3f7-4a38-a61f-738792b12e1a', 3),
('c6faa50c-5827-4780-84c6-d2a158f8513f', 4),
('3f166f5b-ccd1-4825-97ff-3877eb466f70', 4),
('e38f900a-0342-4563-9301-a66cacabc133', 7);
