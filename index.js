console.clear();
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./config/db")
const cors = require("cors");
// const cookieParser = require("cookie-parser");

// app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require("./services")(db));
// app.get("/favicon.ico", (req, res) => res.status(204));


app.use(require("./middlewares/pathNotFound"));

app.use(require("./middlewares/error"));

app.listen(process.env.PORT || 3001, () => console.info("Listening..."))

// export function cookieParser() {
// 	throw new Error("Function not implemented.");
// }
