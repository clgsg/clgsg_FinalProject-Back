module.exports = (req, res, next) => {
	next({ error: new Error("path not found") });
};
