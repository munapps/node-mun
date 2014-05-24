/* jshint phantom: true */
"use strict";

var selfService = require("./self-service");

exports.fn = function (casper) {
	casper
		.start(selfService.urls.LOGIN)
		.then(selfService.steps.login.apply(null, casper.cli.raw.args))
		.thenOpen(selfService.urls.ACADEMIC_RECORD)
		.then(selfService.steps.parseAcademicRecord)
		.run(function () {
			this.exit();
		});
};
