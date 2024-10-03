const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", indexRouter);

const mongoURI_PROD = process.env.MONGODB_URI_PROD;
const mongoURI = mongoURI_PROD;

// const mongoURI_LOCAL = process.env.MONGODB_URI_LOCAL;
// const mongoURI = mongoURI_LOCAL;

mongoose
  .connect(mongoURI)
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("DB connection fail", err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`server on ${process.env.PORT || 5000}`);
});
