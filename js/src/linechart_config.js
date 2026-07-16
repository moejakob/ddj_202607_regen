import * as d3 from "d3";
import de from "./components/german_locale";
d3.timeFormatDefaultLocale(de);
d3.formatDefaultLocale(de);

var config = {
	titel: "Hier steht eine Überschrift",
	subtitel: "Hier steht eine Unterzeile",
	quelle: "Hier steht eine Quelle",
	suffix: "Euro", // Suffix für die Beschriftung

	format: d3.format(",.0f"), // ein d3.format

	scaleTime: true, // Stehen auf der X-Achse Zeitangaben?
	parseTime: d3.timeParse("%Y-%m-%d"),
	timeFormat: d3.timeFormat("%b %y"),
	tooltipTimeFormat: d3.timeFormat("%b %Y"),

	tooltip: true, // Soll ein Tooltip abgebildet werden?
	tooltipOffset: 0, // An welcher Stelle soll der Tooltip stehen, berechnet von top
	tooltipRelevantKeys: ["value"], // Welche Variablen sollen im Tooltip angezeigt werden. Leeres Array = alle.

	paddingTop: 15,
	paddingRight: 20,
	paddingBottom: 28, // Nur zwei zweizeiligen x-Ticks ändern
	height: 250,

	smGroupVar: "group", // Variable, nach der gruppiert werden soll. Nur bei Small Multiples nötig.
	smHeight: 200, // Wie hoch sollen die SM sein?
	smLineColors: ["yellow", "red", "pink", "aqua"], // Sollen die SM-Linien unterschiedliche Farben haben? Falls ja, hier angeben

	xKey: "month", // Das soll auf der X-Achse dargestellt werden
	xGridlines: false, // Wollen wir Gridlines? Falls ja, müssen xTicks eingestellt werden
	xTicks: 4, // Wollen wir Ticks auf der x-Achse? Wie viele? Falls kein scaleTime, muss hier ein Array mit Werten stehen
	xSnapticks: false, // Sollen der erste und der letzte Tick leicht versetzt sein?
	xTickMarks: true, // Kleine Linien an den xTicks
	xRotate: false, // Sollen die X-Labels rotieren?

	yKey: "value", // Das soll auf der y-Achse dargestellt werden
	yGridlines: true,
	yTicks: 4,
	yTickMarks: false,
	yMax: undefined, // Falls nötig: Maximale Ausprägung der y-Achse

	color: "#006ab2", // Diese Farbe sollen Linie und Area haben. Ggf. kann die Farbe einzelner Linien per CSS verändert werden.
	area: true, // Soll neben der Linie noch eine Area abgebildet werden?
	areaLineargradient: false, // Soll die Area ein Gradient haben?
	curve: d3.curveLinear,

	customFunctions: [], // Funktionen, die nach dem Mounting abgeschossen werden sollen.
};

export default config;
