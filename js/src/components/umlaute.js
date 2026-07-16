// export function deUmlaut(value) {
// 	try {
// 		value = value.toLowerCase();
// 		value = value.replace(/ä/g, "ae");
// 		value = value.replace(/ö/g, "oe");
// 		value = value.replace(/ü/g, "ue");
// 		value = value.replace(/ß/g, "ss");
// 		value = value.replace(/ /g, "-");
// 		value = value.replace(/\./g, "");
// 		value = value.replace(/,/g, "");
// 		value = value.replace(/\(/g, "");
// 		value = value.replace(/\)/g, "");
// 		return value;
// 	} catch {}
// }

export function deUmlaut(value) {
	try {
		let string_ = String(value).toLowerCase();
		return string_
			.toLowerCase()
			.replace(/[ßäöü]/g, function (match) {
				switch (match) {
					case "ä":
						return "ae";
					case "ö":
						return "oe";
					case "ü":
						return "ue";
					case "ß":
						return "ss";
				}
			})
			.replace(/[^\s\w]/gi, "")
			.replace(/-/g, "_");
	} catch (error) {
		console.log(error);
	}
}
