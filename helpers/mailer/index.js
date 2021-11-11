const activation = ({ email, token }) => ({
	from: `"Megustalapachanga 🏀⚽🏈🏐🎾" ${process.env.MAIL_USER}`,
	to: `${email}`,
	subject: "Confirma tu correo",
	html: `
		<h2> Ya casi está </h2>
		<p>Para confirmar tu cuenta, haz clic en este enlace:
		<a href="${process.env.SERVER_URL}:${process.env.SERVER_PORT}/auth/confirmation/${token}" target="_blank"> ${process.env.SERVER_URL}:${process.env.SERVER_PORT}/auth/confirmation/${token}</a>.
		</p>
  `,
});

const confirmation = ({ email, username }) => ({	//? AÑADIR 'sexo' y filtrar 'bienvenido' / 'bienvenida'¿?
	from: `"Megustalapachanga 🏀⚽🏈🏐🎾" ${process.env.MAIL_USER}`,
	to: `${email}`,
	subject: `${username}, tu cuenta ha sido verificada`,
	html: `
		<h2> Gracias por registrarte, ${username}. </h2>
		<p>Visita Megustalapachanga a menudo para aprovecharla al máximo y divertirte practicando deporte.</p>
  `,
});

const forgottenPassword = ({ email, token }) => ({
	from: `"Megustalapachanga 🏀⚽🏈🏐🎾" ${process.env.MAIL_USER}`,
	to: `${email}`,
	subject: "Contraseña olvidada",
	html: `
		<h2>¿Has olvidado tu contraseña?</h2>
		<p>Clica <a href="${process.env.SERVER_URL}:${process.env.SERVER_PORT}/auth/password/request?token=${token}&email=${email}"> aquí </a> para poder obtener una nueva contraseña</p>
		`,
});

const passwordUpdate = ({ email, token }) => ({
	from: `"Megustalapachanga 🏀⚽🏈🏐🎾" ${process.env.MAIL_USER}`,
	to: `${email}`,
	subject: "Actualiza tu contraseña",
	html: `
		<h2>Hemos recibido tu solicitud de cambio de contraseña</h2>
		<p>Para completar el proceso haz clic en<a href="${process.env.SERVER_URL}:${process.env.SERVER_PORT}/auth/password/request?token=${token}&email=${email}"> este enlace </a>.</p>
		`,
});

const createdGame = ({
	email,
	username,
	sport,
	date,
	time,
	venue,
	gender,
	adapted
}) => ({
	from: `"Megustalapachanga 🏀⚽🏈🏐🎾" ${process.env.MAIL_USER}`,
	to: `${email}`,
	subject: "Has creado una pachanga",
	html: `
	<h2>${username}, has creado una pachanga</h2>
	<p>de ${sport} para el día ${date} a las ${time} en ${venue}.</p>
	<p>${(gender="Mixto" && `Podrán participar hombres y mujeres`)}</p>
	//todo: personalizar para que game_gender> sólo para hombres/mujeres/para hombres y mujeres
	<p>${(adapted=true && `Está prevista la adaptación inclusiva de materiales o normas`)}</p>
	//todo: personalizar adaptado.
	`,
});

const signedUp4Game = ({
	email,
	username,
	sport,
	date,
	time,
	venue,
	gender,
	adapted,
	notes,
}) => ({
	from: `"Megustalapachanga 🏀⚽🏈🏐🎾" ${process.env.MAIL_USER}`,
	to: `${email}`,
	subject: "Te has inscrito en una pachanga",
	html: `
	<h2>${username}, te has inscrito en una pachanga</h2>
	<p>de ${sport} para el día ${date} a las ${time} en ${venue}.</p>
	<p>${(gender = "Mixto" && `Podrán participar hombres y mujeres`)}</p>
	//todo: personalizar para que game_gender> sólo para hombres/mujeres/para hombres y mujeres
	<p>${(adapted =
		true &&
		`Está prevista la adaptación inclusiva de materiales o normas`)}</p>
	//todo: personalizar adaptado.
	<p>${(notes && `Notas: ${notes}`)}</p>
	`,
});

module.exports = {
	activation,
	confirmation,
	forgottenPassword,
	passwordUpdate,
	createdGame,
	signedUp4Game,
};
