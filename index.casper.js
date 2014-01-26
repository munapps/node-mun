"use strict";

var ROOT = "./";
var config = require(ROOT + "config.casper");

var casper = require("casper").create(config.casperOptions);
var utils = require("utils");

require(ROOT + casper.cli.get("script")).fn(casper);
