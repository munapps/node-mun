/* jshint node: true */
"use strict";

var MUN = require("..");

MUN.campus.cancellations()
.then(
	function (results) {
		console.log("The list of cancellations:");
		var cancellations = JSON.parse(results[0]);
		console.log(cancellations);
	},
	function (error) {
		console.error(error);
	}
);
