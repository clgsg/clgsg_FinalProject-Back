const createCookie = (res, accessToken, expiration = 300000) => {
res.cookie('token', accessToken, {
  expires: new Date(Date.now() + expiration),
  secure: false,
  httpOnly: true
  })
}
const clearCookie = res => {
  res.clearCookie()
}
module.exports = {
  createCookie,
  clearCookie,
}
