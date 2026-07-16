import * as d3 from "d3";

import de from "./components/german_locale";
d3.timeFormatDefaultLocale(de);
d3.formatDefaultLocale(de);

//////////////////////////////////////////
///// ACHTUNG! Derzeit funktionieren /////
///// Multilinecharts nur mit Daten  /////
///// im Wide-Format! Siehe Beispiel /////
///// im Ordner data.                /////
//////////////////////////////////////////

var config = {
	titel: "Hier steht eine Überschrift",
	subtitel: "",
	quelle: "wg-gesucht.de",
	suffix: "€", // Suffix für die Beschriftung
	suffixYAxis: true, // Soll der oberste Tick der yAchse den Suffix abbilden?

	format: d3.format(",.0f"), // ein d3.format
	parseTime: d3.timeParse("%m"),
	timeFormat: d3.timeFormat("%m"),
	tooltipTimeFormat: d3.timeFormat("%m"),
	seriesNames: ["value", "value_b"], // Welche Spalten sollen dargestellt werden?

	legende: true, // Soll die Grafik eine Legende haben?

	tooltip: true, // Soll ein Tooltip abgebildet werden?
	tooltipOffset: 0, // Auf welcher Höhe soll der Tooltip stehen?
	relevantKeys: ["value", "value_b"], // Welche Variablen sollen im Tooltip angezeigt werden. Leeres Array = alle.

	paddingTop: 15,
	paddingRight: 20,
	paddingBottom: 28, // Nur bei zweizeiligen Ticks ändern
	height: "250px",

	xKey: "month", // Das soll auf der X-Achse dargestellt werden
	xGridlines: false, // Wollen wir Gridlines? Falls ja, müssen xTicks eingestellt werden
	xTicks: 5, // Wollen wir Ticks auf der x-Achse? Wie viele?
	xSnapticks: false, // Sollen der erste und der letzte Tick leicht versetzt sein?
	xTickMarks: true, // Kleine Linien an den xTicks
	xRotate: false,

	yKey: "value", // Bitte NICHT verändern! Es werden alle Spalten dargestellt, die die Daten hergeben
	yGridlines: true,
	yTicks: 3,
	ySnapticks: false,
	yTickMarks: false,
	yMax: undefined, // Falls nötig: Maximale Ausprägung der y-Achse
	yMin: 0, // Minimale Aufpräsung der Y-Achse
	yRound: null, // Falls nötig: Worauf soll die y-Achse gerundet werden?

	color: d3.scaleOrdinal(["value", "value_b"], ["#006ab2", "#ec9637"]), // eine d3-Farbskala.
	curve: d3.curveLinear, // Welcher Kurvenberechnung soll die Linie unterliegen?

	area: false, // Sollen die Linien Areas haben. Nur sinnvoll bei zwei stark unterschiedlichen Linien.
	areaBetween: false, // Soll zwischen zwei Linien eine Fläche markiert werden?
	areaKeys: ["value", "value_b"], // Zwischen welchen Variablen soll die Fläche liegen?
	areaFill: "#dbdbdb", // Welche Farbe soll die Fläche haben?

	// Diese Optionen sind nur für Small Multiples nötig
	smGroupVar: "group", // Variable, nach der gruppiert werden soll. Nur bei Small Multiples nötig.
	smHeight: 200, // Wie hoch sollen die SM sein?
	smLineColors: ["yellow", "red", "pink", "aqua"], // Sollen die SM-Linien unterschiedliche Farben haben? Falls ja, hier angeben

	customFunctions: [], // Funktionen, die nach dem Mounting abgeschossen werden sollen.
};

export default config;
