/* jshint node: true */
"use strict";

var exec = require("child_process").exec;
var glob = require("glob");
var path = require("path");
var utils = require("./utils");

var CASPERJS_PATH = path.resolve(__dirname, "./casperjs");

var casperjs = function casperjs(filename, args) {
	return [
		"phantomjs", // Engine name (either PhantomJS or SlimerJS)
		utils.quote(path.join(CASPERJS_PATH, "bin", "bootstrap.js")),
		"--casper-path=" + utils.quote(CASPERJS_PATH),
		"--cli",
		"index.casper.js",
		"--script=" + utils.quote(path.relative(__dirname, filename))
	]
	.concat(args)
	.join(" ");
};

var MUN = {};
glob.sync(path.join(__dirname, "scripts/**/*.casper.js")).forEach(function (e, i, a) {
	var module = utils.hyphensToCamelCase(path.basename(path.dirname(e)));
	var script = utils.hyphensToCamelCase(path.basename(e).split(".")[0]);
	MUN[module] = MUN[module] || {};
	MUN[module][script] = function (args, cb) { exec(casperjs(e, args), cb); };
});

module.exports = MUN;
