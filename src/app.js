const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes/api");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());

const mongoUrl = process.env.MONGO_URI;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "database connection error:"));
db.once("open", function () {
  console.log("database connection ok");
});

const PORT = process.env.port || 2000;

app.use(routes);

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
