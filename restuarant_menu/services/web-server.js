const http = require("http");
const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const webServerConfig = require("../config/web-server.js");
const cors = require("cors");

const log = require("electron-log");
const path = require("path");
const logPath = path.join(__dirname, "./../DataHub.log");
log.transports.file.level = "info";
log.transports.file.file = logPath;

let router = require("../router/api/getdata.router");


let httpServer;

//This function is to initialize Web Server
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);
    app.use(cors());

    app.use(
      bodyparser.urlencoded({
        limit: "10000mb",
        extended: true,
        parameterLimit: 50000,
      })
    );
    app.use(bodyparser.json({ limit: "10000mb", extended: true }));
    // app.use(bodyparser.json());

    app.use("/Menu", router);
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, *"
      );
      next();
    });

    //Combines logging info from request and response
    app.use(morgan("combined"));

    // app.use(express.json({ extended: true }));

    var server = httpServer
      .listen(webServerConfig.port)
      .on("listening", () => {
        log.info(`Web server listening on localhost:${webServerConfig.port}`);
        resolve();
      })
      .on("error", (err) => {
        reject(err);
        log.error(err);
      });
    server.setTimeout(1000 * 60 * 20);
  });
}
module.exports.initialize = initialize;

//This function is to close Web Server
function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        log.error("Error in Closing Web Server :" + err);
        return;
      }
      resolve();
    });
  });
}
module.exports.close = close;