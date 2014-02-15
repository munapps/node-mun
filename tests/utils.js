/* jshint node: true */
"use strict";

var utils = require("../utils");

exports.testEscapeshellarg = function (test) {
	test.equals("", utils.escapeshellarg(""));
	test.equals("'foo\\''", utils.escapeshellarg("foo'"));
	test.done();
};

exports.testQuote = function (test) {
	test.equals("", utils.quote(""));
	test.equals(undefined, utils.quote(undefined));
	test.equals("\"words\"", utils.quote("words"));
	test.done();
};
