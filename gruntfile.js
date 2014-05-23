/* global module */
module.exports = function (grunt) {
	"use strict";
	// Blank slate
	grunt.initConfig({});
	// JSHint
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.config("jshint", {
		"options": {
			"jshintrc": true
		},
		"all": ["*.js", "**/*.js", "tests/*.js"]
	});
	// Nodeunit
	grunt.loadNpmTasks("grunt-contrib-nodeunit");
	grunt.config("nodeunit", {
		"all": ["tests/*.js"],
		"options": {
			"reporter": "minimal"
		}
	});
	// Default task
	grunt.registerTask("default", "Does nothing.", function () { /* Does nothing */ });
	// Aliases
	grunt.registerTask("test", ["jshint", "nodeunit"]);
};
