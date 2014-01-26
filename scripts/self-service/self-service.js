/* jshint phantom: true, -W069: true */
/* global patchRequire */
"use strict";

var require = patchRequire(require);

var selfService = exports;

selfService.urls = {
	ACADEMIC_RECORD: "https://www5.mun.ca/admit/bwskotrn.P_ViewTran?tprt=UNWB",
	FINAL_EXAM_SCHEDULE: "https://www5.mun.ca/admit/swkexam.P_DispExamSchd",
	LOGIN: "https://www5.mun.ca/admit/twbkwbis.P_WWWLogin"
};

selfService.steps = {};
selfService.steps.login = function (username, password) {
	return function login() {
		var values = {
			"sid": username,
			"PIN": password
		};
		this.fill("form[name = 'loginform']", values, true);
	};
};
selfService.steps.parseFinalExamSchedule = function () {
	this.echo(this.evaluate(function () {
		var table = this.document.querySelectorAll(".pagebodydiv table")[1];
		var tbody = table.tBodies[0];
		var trows = tbody.rows;
		var headings = Array.prototype.slice.call(trows[1].querySelectorAll("th"), 0).map(function (col, idx, arr) {
			return col.textContent;
		});
		var data = Array.prototype.slice.call(trows, 2).map(function (e, i, a) {
			var exam = {};
			Array.prototype.slice.call(e.querySelectorAll("td"), 0)
				.map(function (col, idx, arr) {
					return col.textContent;
				})
				.forEach(function (col, idx, arr) {
					exam[headings[idx]] = col;
				});
			return exam;
		});
		return JSON.stringify({
			"semester": trows[0].textContent.trim().split(": ")[1],
			"exams": data
		});
	}));
};
selfService.steps.parseAcademicRecord = function () {
	this.echo(this.evaluate(function () {
		/* jshint ignore: start */
		String.prototype.toMixedCamelCase = function () {
			return this.trim().replace(/([^\W_]+[^\s-]*) */g, function(s) {
				return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
			})
			.replace(/\s+/g, "")
			.replace(/^./, function (s) {
				return s.toLowerCase();
			});
		};
		/* jshint ignore: end */
		var tableRows = Array.prototype.slice.call(this.document.querySelectorAll(".pagebodydiv table")[1].tBodies[0].rows, 0)
		.filter(function (e, i, a) {
			return (e.children.length !== e.querySelectorAll(".ddseparator").length);
		});
		var startOfInstitutionCredit = tableRows.indexOf(this.document.querySelectorAll("a[name = 'insti_credit']")[0].parentNode.parentNode);
		var startOfTranscriptTotals = tableRows.indexOf(this.document.querySelectorAll("a[name = 'trans_totals']")[0].parentNode.parentNode);
		var startOfCoursesInProgress = tableRows.indexOf(this.document.querySelectorAll("a[name = 'crses_progress']")[0].parentNode.parentNode);
		var institutionCreditTable = tableRows.slice(startOfInstitutionCredit + 1, startOfTranscriptTotals);
		var transcriptTotalsTable = tableRows.slice(startOfTranscriptTotals + 1, startOfCoursesInProgress);
		var coursesInProgressTable = tableRows.slice(startOfCoursesInProgress + 1);
		var parseTable = function (rows) {
			var o = {};
			var idx = -1;
			var headings;
			rows.forEach(function (e, i, a) {
				var titles = e.querySelectorAll(".ddtitle");
				var headers = e.querySelectorAll(".ddheader");
				var labels = e.querySelectorAll(".ddlabel");
				var defaults = e.querySelectorAll(".dddefault");
				var label, tmp, placeholder;
				if (titles.length == 1) {
					o["terms"][idx]["totals"] = {};
				}
				if (headers.length > 0) {
					headings = Array.prototype.map.call(headers, function (e, i, a) {
						return e.textContent.toMixedCamelCase();
					});
				}
				if (labels.length == 1 && defaults.length === 0) {
					o["terms"] = o["terms"] || [];
					idx += 1;
					o["terms"][idx] = {};
					o["terms"][idx]["name"] = labels[0].childNodes[0].textContent.trim().split(": ")[1];
					o["terms"][idx]["courses"] = [];
				}
				if (labels.length == 1 && defaults.length == 1) {
					label = labels[0].childNodes[0].textContent.toMixedCamelCase();
					o["terms"][idx][label.substring(0, label.length - 1)] = defaults[0].childNodes[0].textContent.trim();
				}
				if (labels.length == 1 && defaults.length > 1) {
					placeholder = o["terms"] ? o["terms"][idx] : o;
					placeholder["totals"] = placeholder["totals"] || {};
					tmp = {};
					Array.prototype.forEach.call(defaults, function (e, i, a) {
						tmp[headings[i]] = e.textContent.trim();
					});
					label = labels[0].childNodes[0].textContent.toMixedCamelCase();
					placeholder["totals"][label.substring(0, label.length - 1)] = tmp;

				}
				if (labels.length === 0 && defaults.length > 0) {
					tmp = {};
					Array.prototype.forEach.call(defaults, function (e, i, a) {
						tmp[headings[i]] = e.textContent.trim();
					});
					o["terms"][idx]["courses"].push(tmp);
				}
			});
			return o;
		};
		return JSON.stringify({
			"transcriptTotals": parseTable(transcriptTotalsTable),
			"coursesInProgress": parseTable(coursesInProgressTable),
			"institutionCredit": parseTable(institutionCreditTable)
		});
	}));
};
