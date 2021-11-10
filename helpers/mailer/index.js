const activation = ({ to, token }) => ({
	from: `"Megustalapachanga 🏀⚽🏈🏐🎾" ${process.env.MAIL_USER}`,
	to,
	subject: "Confirma tu correo",
	html: `
		<h2> Ya casi está </h2>
		<p>Para confirmar tu cuenta, haz clic en este enlace:
		<a href="${process.env.SERVER_URL}:${process.env.SERVER_PORT}/auth/confirmation/${token}" target="_blank"> ${process.env.SERVER_URL}:${process.env.SERVER_PORT}/auth/confirmation/${token}</a>.
		</p>
  `,
});

const confirmation = ({ to, username }) => ({	//? AÑADIR 'sexo' y filtrar 'bienvenido' / 'bienvenida'¿?
	from: `"Megustalapachanga 🏀⚽🏈🏐🎾" ${process.env.MAIL_USER}`,
	to,
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

module.exports = {
	activation,
	confirmation,
	forgottenPassword,
	passwordUpdate,
};
