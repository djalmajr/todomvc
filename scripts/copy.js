const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const shell = require("shelljs");

const DEV = process.env.NODE_ENV === "development";
const hyperPath = DEV ? "../node_modules/hyperhtml/umd.js" : "hyperhtml.js";
const appPath = DEV ? "../src/index.js" : "bundle.js";
const copyCmd = DEV ? "" : "cp node_modules/hyperhtml/umd.js dist/hyperhtml.js";
const tplPath = path.resolve(__dirname, "../public/index.html");
const outputPath = path.resolve(__dirname, "../dist/index.html");
const $ = cheerio.load(fs.readFileSync(tplPath, "utf8"));

shell.exec(`mkdir -p dist; cp public/*.css dist; ${copyCmd}`);

$("body").append(`<script src="${hyperPath}"></script>`);
$("body").append(`<script src="${appPath}" type="module"></script>`);

fs.writeFileSync(outputPath, $.html(), "utf8");
