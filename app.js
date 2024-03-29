var express = require("express");
var app = express();
const path = require("path");
var http = require("http");
var genuuid = require("uuid").v4;
const session = require("express-session");
const MongoStore = require("connect-mongo");

require("dotenv").config();

const port = process.env.PORT || 4000;

const api = require("./server/api");
const db = require("./server/db");
const indexapi=require("./index");

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}).then(() => {
  //Handle /api with the api middleware
  app.use(
    "/",
    session({
      genid() {
        return genuuid(); // use UUIDs for session IDs
      },
      store: new MongoStore({ client: db.getClient() }),
      secret: "hellokundan",
      resave: false,
      saveUninitialized: true,
    }),
    allowCrossDomain,
    indexapi
  );

  
  //Start listening on port
  app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
  });
});
