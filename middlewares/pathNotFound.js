module.exports = (req, res, next) => {
	next({ error: new Error("No se ha encontrado esta ruta") });
};
