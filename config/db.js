const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/library", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.info("Succesfully connected to mongoDB"))
	.catch((error) => {
		console.error("Error trying to connect to mongoDB: ", error.message);
		process.exit(0);
	});
