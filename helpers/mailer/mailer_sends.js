const { sendActivationMail } = require('./activation')
const { sendConfirmationMail } = require('./confirmation')
const { sendForgottenPassword} = require('./forgottenPassword')
const { sendPasswordUpdate } = require('./passwordUpdate')
const { sendCreatedGameMail } = require('./createdGame')
const { sendSignedUp4GameMail } = require('./signedUp4Game')


module.exports = {
  sendActivationMail,
  sendConfirmationMail,
  sendForgottenPassword,
  sendPasswordUpdate,
  sendCreatedGameMail,
  sendSignedUp4GameMail,
}
