/* jshint node: true */
"use strict";

var q = require("q");
var exec = q.denodeify(require("child_process").exec);
var glob = require("glob");
var path = require("path");
var utils = require("./utils");

var CASPERJS_PATH = path.resolve(__dirname, "./casperjs");

var casperjs = function casperjs(filename, args) {
	return [
		"phantomjs", // Engine name (either PhantomJS or SlimerJS)
		"--ignore-ssl-errors=true", // Ignore SSL errors such as expired or self-signed certificate errors
		utils.quote(path.join(CASPERJS_PATH, "bin", "bootstrap.js")),
		"--casper-path=" + utils.quote(CASPERJS_PATH),
		"--cli",
		utils.quote(path.resolve(__dirname, "./index.casper.js")),
		"--script=" + utils.quote(path.relative(__dirname, filename))
	]
	.concat(args ? args.map(utils.escapeshellarg) : [])
	.join(" ");
};

var MUN = {};
glob.sync(path.join(__dirname, "scripts/**/*.casper.js")).forEach(function (e, i, a) {
	var module = utils.hyphensToCamelCase(path.basename(path.dirname(e)));
	var script = utils.hyphensToCamelCase(path.basename(e).split(".")[0]);
	MUN[module] = MUN[module] || {};
	MUN[module][script] = function () {
		return exec(casperjs(e, Array.prototype.slice.call(arguments)));
	};
});

module.exports = MUN;
