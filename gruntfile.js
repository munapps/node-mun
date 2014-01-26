/* global module */
module.exports = function (grunt) {
	"use strict";
	grunt.initConfig({});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.config("jshint", {
		"options": {
			"jshintrc": true
		},
		"all": ["*.js", "**/*.js"]
	});

	grunt.registerTask("default", "Does nothing.", function () {
		grunt.log.write("Doing nothing.");
	});
};
