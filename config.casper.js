/* jshint phantom: true */
/* global patchRequire */
"use strict";

var require = patchRequire(require);

var config = exports;

config.casperOptions = {
	"clientScripts": [],
	"exitOnError": true,
	"logLevel": "error",
	"pageSettings": {
		"loadImages": false,
		"loadPlugins": false
	},
	"remoteScripts": [],
	"safeLogs": true,
	"silentErrors": false,
	"stepTimeout": null,
	"timeout": null,
	"verbose": true,
	"viewportSize": {
		"width": 1024,
		"height": 768
	}
};
