/* jshint node: true */
"use strict";

var MUN = require("..");

var username = "YOUR MUN STUDENT NUMBER";
var password = "YOUR SELF SERVICE PIN #";

/**
 * The MUN.selfService object exposes:
 *
 *     .finalExamSchedule([ username, password ])
 *     .academicRecord([ username, password ])
 */
MUN.selfService.finalExamSchedule([ username, password ])
.then(
	function (results) {
		var exams = JSON.parse(results[0]);
		console.log(exams);
	},
	function (error) {
		console.error(error);
	}
);
