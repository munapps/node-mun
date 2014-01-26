"use strict";

var selfService = require("./self-service");

exports.fn = function (casper) {
	casper
		.start(selfService.urls.LOGIN)
		.then(selfService.steps.login.apply(null, casper.cli.raw.args))
		.thenOpen(selfService.urls.FINAL_EXAM_SCHEDULE)
		.then(selfService.steps.parseFinalExamSchedule)
		.run(function () {
			this.exit();
		});
};
