/* jshint globalstrict: false, strict: true */
/* global module, toString */

var isString = function isString(s) {
	// From lodash and/or underscore's _.isString <http://git.io/zbc_nw>
	"use strict";
	return typeof s == "string" || s && typeof s == "object" && toString.call(s) == "[object String]" || false;
};
var utils = {
	"escapeshellarg": function escapeshellarg(arg) {
		// As defined in the PHP Manual: <www.php.net/escapeshellarg>
		"use strict";
		return (!isString(arg) || arg.length <= 0) ? arg : "'" + (arg || "").replace(/'/g, "\\'") + "'";
	},
	"hyphensToCamelCase": function hyphensToCamelCase(s) {
		"use strict";
		return !isString(s) ? s : s.replace(/-([a-zA-Z])/g, function (s, g) {
			return g.toUpperCase();
		});
	},
	"isString": isString,
	"quote": function quote(s) {
		"use strict";
		return (!isString(s) || s.length <= 0) ? s : "\"" + s + "\"";
	}
};
if (module.exports) {
	module.exports = utils;
}
