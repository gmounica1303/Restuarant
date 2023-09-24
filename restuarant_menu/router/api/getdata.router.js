const express = require("express");
const router = express.Router();
const log = require("electron-log");
const path = require("path");
const logPath = path.join(__dirname, "../../../RestMenu.log");
log.transports.file.level = "info";
log.transports.file= logPath

const Menu = require("../../controllers/Menu");

router.route("/").get(Menu.getMenu);

module.exports = router;