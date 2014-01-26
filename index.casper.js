/* jshint phantom: true */
"use strict";

var ROOT = "./";
var config = require(ROOT + "config.casper");

var casper = require("casper").create(config.casperOptions);

require(ROOT + casper.cli.get("script")).fn(casper);
