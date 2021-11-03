module.exports = ({ statusCode = 500, error }, req, res) => {
	res.status(statusCode).json({
		sucess: false,
		message: error.message,
	});
};
