const {
	confirmation,
	activation,
	forgottenPassword,
	passwordUpdate,
} = require("../helpers/templates");
const { catcher } = require("../utils");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

const send = transporter.sendMail.bind(transporter);

const sendMail = {
	activation: async ({ to, token }) => {
		await catcher(send)(activation({ to, token }));
	},
	confirmation: async ({ to, username }) => {
		await catcher(send)(confirmation({ to, username }));
	},
	forgottenPassword: async ({ email, token }) => {
		await catcher(send)(forgottenPassword({ email, token }));
	},
	passwordUpdate: async ({ email, token }) => {
		await catcher(send)(passwordUpdate({ email, token }));
	},
};

module.exports = {
	sendMail,
};