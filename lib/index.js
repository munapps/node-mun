/* jshint node: true */
"use strict";

var q = require("q");
var exec = q.denodeify(require("child_process").exec);
var glob = require("glob");
var path = require("path");

var u = require("./utils");

var casperjs = function casperjs(filename, args) {
	var casper = path.resolve(__dirname, "../casperjs");
	var command =  [
		// Engine name (either PhantomJS or SlimerJS)
		"phantomjs",
		// Ignore SSL errors such as expired or self-signed certificate errors
		"--ignore-ssl-errors=true",
		// CasperJS bootstrap filename
		u.quote(path.join(casper, "bin", "bootstrap.js")),
		// Arguments for CasperJS
		"--casper-path=" + u.quote(casper),
		"--cli",
		u.quote(path.resolve(__dirname, "./casper/index.js")),
		"--script=" + u.quote(filename)
	];
	return command.concat(args ? args.map(u.escapeshellarg) : []).join(" ");
};

var MUN = module.exports = {};
glob.sync(path.join(__dirname, "./casper/*/**/*.js")).forEach(function (e, i, a) {
	var module = u.hyphensToCamelCase(path.basename(path.dirname(e)));
	var script = u.hyphensToCamelCase(path.basename(e).split(".")[0]);
	MUN[module] = MUN[module] || {};
	MUN[module][script] = function (args) {
		return exec(casperjs(e, args));
	};
});
