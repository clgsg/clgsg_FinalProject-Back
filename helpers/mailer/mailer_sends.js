const { sendActivationMail } = require('./activation')
const { sendConfirmationMail } = require('./confirmation')
const { sendForgottenPassword} = require('./forgottenPassword')
const { sendPasswordUpdate } = require('./passwordUpdate')


module.exports = {
  sendActivationMail,
  sendConfirmationMail,
  sendForgottenPassword,
  sendPasswordUpdate,
}
