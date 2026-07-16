import * as d3 from "d3";

export function parseDate(dateString) {
	let formats = [
		"%Y-%m-%d",
		"%y-%m-%d",
		"%m/%d/%Y",
		"%m/%d/%y",
		"%d/%m/%Y",
		"%d/%m/%y",
		"%d-%m-%Y",
		"%d-%m-%y",
		"%Y/%m/%d",
		"%y/%m/%d",
		"%d.%m.%Y",
		"%d.%m.%y",
		"%m-%d-%Y",
		"%m-%d-%y",
		"%d %B %Y",
		"%d %B %y",
		"%B %d, %Y",
		"%B %d, %y",
		"%d. %b %y",
		"%d. %b %Y",
	];
	let fourDigitRegex = /\d{4}/;
	let twoDigitRegex = /\d{2}/;
	if (fourDigitRegex.test(dateString)) {
		for (const format of formats) {
			if (format.includes("%Y")) {
				let date = d3.timeParse(format)(dateString);
				if (date) {
					return date;
				}
			}
		}
	} else if (twoDigitRegex.test(dateString)) {
		for (const format of formats) {
			if (format.includes("%y")) {
				let date = d3.timeParse(format)(dateString);
				if (date) {
					return date;
				}
			}
		}
	}
	return null;
}
