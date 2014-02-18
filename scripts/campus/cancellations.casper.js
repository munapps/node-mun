/* jshint phantom: true */
"use strict";

exports.fn = function (casper) {
	casper
		.start("http://www.mun.ca/main/cancellations.php")
		.then(function () {
			this.echo(this.evaluate(function () {
				var middle = this.document.getElementById("middle");
				var cancellations = [];
				Array.prototype.forEach.call(middle.getElementsByTagName("p"), function (e, i, a) {
					Array.prototype.forEach.call(e.getElementsByTagName("strong"), function (f, j, b) {
						cancellations.push(f.textContent);
					});
				});
				return JSON.stringify(cancellations);
			}));
		})
		.run(function () {
			this.exit();
		});
};
