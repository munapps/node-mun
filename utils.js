/* jshint globalstrict: false */
/* global module */
var utils = {
	"hyphensToCamelCase": function hyphensToCamelCase(s) {
		"use strict";
		return s.replace(/-([a-zA-Z])/g, function (s, g) {
			return g.toUpperCase();
		});
	},
	"quote": function quote(s) {
		"use strict";
		return "\"" + s + "\"";
	}
};
if (module.exports) {
	module.exports = utils;
}
