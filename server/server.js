#!/usr/bin / env node

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
var bodyParser = require("body-parser");
var chalk = require('chalk');
var outputColor = chalk.yellow;
var express = require("express");
var app = express();
var path = require('path');
var rootDir = path.join(__dirname, "/../");
var cacheAge = 0;

console.log(outputColor("SERVER SERVING FROM " + rootDir + " with caching maxage = ", cacheAge));

// For Assimulation
app.use("/hosted", express.static(path.join(__dirname, "/../hosted"), {
	maxage: cacheAge
}));

// Sample server root set to "/yourSubDirectory" -- must align with paths thoughout configs/openfin/manifest-local.json and configs/other/server-environment-startup.json
app.use("/yourSubDirectory", express.static(rootDir, {
	maxage: cacheAge
}));
global.root = "/yourSubDirectory";


var PORT = process.env.PORT || 3375;

var server = app.listen(PORT, function () {
	console.log(chalk.green("listening on port " + PORT));
	global.host = server.address().address;
	global.port = server.address().port;
	console.log(chalk.green("server up.........................."));
});