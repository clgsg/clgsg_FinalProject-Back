const catcher =
	(fn) =>
	async ({ ...args }) => {
		try {
			await fn({ ...args });
		} catch (error) {
			console.info("⛔ Error at query: ", error.message);
			return false;
		}
	};

module.exports = {catcher,};
