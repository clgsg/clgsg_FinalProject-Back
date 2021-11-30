console.clear();
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const db = require("./config/db")

const app = express();
const main = require('./services')

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require("./services")(db));
// app.get("/favicon.ico", (req, res) => res.status(204));
app.use(main(db))


app.use(require("./middlewares/pathNotFound"));

app.use(require("./middlewares/error"));

app.listen(process.env.PORT || 3001, () => console.info("Listening..."))
