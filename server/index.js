const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

const routes = require("./src/routes/api");

const PORT = process.env.PORT || 5000;

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
db.once("open", () => {
  console.log("database connection ok");
});

// if (
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "staging"
// ) {
//   app.use(express.static("./client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname + "/client/build/index.html"));
//   });
// }

app.use("/api", routes);

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
    stack: error.stack,
    // stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
