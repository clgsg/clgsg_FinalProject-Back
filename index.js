console.clear();
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
// const cors = require("cors");		//* Conexión entre back y front

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const db = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(require("./services")(db));

// app.use(require("./middlewares/pathNotFound"));

// app.use(require("./middlewares/error"));

// app.listen(process.env.PORT || 3000, () => {
// 	console.log("> ✅ server up at port", process.env.PORT);
// });
app.listen(process.env.PORT || 3001, () => console.info("Listening..."))