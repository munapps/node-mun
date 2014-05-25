/* jshint phantom: true */
"use strict";

var ROOT = "./";
var config = require(ROOT + "config");

var casper = require("casper").create(config.casperOptions);

require(casper.cli.get("script")).fn(casper);
