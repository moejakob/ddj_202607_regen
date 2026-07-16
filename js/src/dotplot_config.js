import * as d3 from "d3";

import de from "./components/german_locale";
d3.timeFormatDefaultLocale(de);
d3.formatDefaultLocale(de);

var config = {
	xKey: undefined, // Array nötig. Falls undefined, werden alle auser yKey dargestellt.
	yKey: "ort",
	titel: "Hier steht ein Titel",
	subtitel: "",
	quelle: "Hier steht eine Quelle",

	xMin: 11,
	xMax: 22,
	xTicks: [11, 13, 15, 17, 19, 21],

	seriesColors: ["#33A173", "#D14849", "#006ab2"],

	paddingTop: 0,
	paddingRight: 10,
	paddingBottom: 28, // Nur bei zweizeiligen x-Ticks ändern
};

export default config;
