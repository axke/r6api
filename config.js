require("dotenv").config();

const path = require("path");
const os = require("os");

const delayAuth = process.env.DELAYAUTH === "true";
const tokenfile = process.env.APPSHARE || path.join(os.tmpdir(), "rainbowtoken.json");

module.exports = {
    delayAuth,
    tokenfile
};
