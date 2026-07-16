import * as d3 from "d3";

import de from "./components/german_locale";
d3.timeFormatDefaultLocale(de);
d3.formatDefaultLocale(de);

var config = {
	titel: "Pendelsaldo",
	subtitel: "",
	quelle: "Statistisches Landesamt BW, Schweizer Bundesamt für Statistik | Stand: 2020",
	suffix: "", // Suffix für die Beschriftung
	format: d3.format(".0f"), // ein d3.format
	labelThreshold: 0, // ab welchem Wert sollen die Label außerhalb des Balkens stehen?

	paddingRight: 50,
	paddingLeft: undefined,

	xKey: "value", // Das soll auf der X-Achse dargestellt werden
	xGridlines: false, // Wollen wir Gridlines? Falls ja, müssen xTicks eingestellt werden
	xTicks: 15, // Wollen wir Ticks auf der x-Achse? Wie viele?
	xSnapticks: false, // Sollen der erste und der letzte Tick leicht versetzt sein?
	xTickMarks: false, // Kleine Linien an den xTicks
	xMax: undefined, // Falls nötig: Maximale Ausprägung der x-Achse
	xMin: undefined, // Falls nötig: Minimale Ausprägung der x-Achse

	yKey: "year", // Das soll auf der y-Achse dargestellt werden
	yGridlines: false,
	yTicks: 0,
	yTickMarks: true,

	color: "#006ab2", // Diese Farbe sollen die Bars haben. Ggf. kann die Farbe einzelner Balken per CSS verändert werden.

	groupVar: "group", // Variable, nach der gruppiert werden soll. Nur bei Small Multiples nötig.

	customFunctions: [], // Funktionen, die nach dem Mounting abgeschossen werden sollen.
};

export default config;
