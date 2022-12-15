const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./schemas/conn");
const morgan = require("morgan");

// Handling JSON data
app.use(bodyParser.json());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cors({ origin: "*" }));

app.use(morgan("dev"));

// Heder
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );

  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );

  next();
});

// use middlewer for img upload
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static("/uploads"));

// use router (routing apis)
app.use(require("./module/loginapi"));
app.use(require("./module/userapi"));
app.use(require("./module/orderapi"));

// create a api

const port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log("http://localhost:8000");
});
