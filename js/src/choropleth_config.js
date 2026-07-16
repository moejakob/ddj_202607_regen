import * as d3 from "d3";
import de from "./components/german_locale";
d3.timeFormatDefaultLocale(de);
d3.formatDefaultLocale(de);

var config = {
	titel: "",
	subtitel: "",
	quelle: "DWD",

	legende: false, // Braucht es eine Legende?
	legendeTitel: "Falschgelddelikte",
	legendeFormat: d3.format(",.0f"), // Ein Format für die Legende
	legendeWidth: 200, // Breite der Legende. Maximal 290!
	height: "100vh", // Größe des Charts als String

	suffix: "", // Suffix für den Tooltip
	format: d3.format(",.0f"), // ein d3.format
	choroTooltips: false, // Sollen die Choroplethen einen Tooltip anzeigen?
	tooltipValues: [], // Ein Array mit allen Variablen, die im Tooltip erscheinen sollen

	pointRadius: 5, // Falls Punkte dargestellt werden sollen: Welchen Radius sollen sie haben?
	pointClassName: "id", //Variable, die den Punkten eine Klasse zuordnen soll. Zum Beispiel die ID.

	paddingTop: 10,
	paddingRight: 50,
	paddingBottom: 5, // Maximal 25
	paddingLeft: 50,

	colorKey: "hitzetag", // Die Variable, die dargestellt werden soll
	joinKey: "gkz", // Die Variable, die shapes und data teilen

	scale: d3.scaleThreshold(
		[25, 50, 75, 100],
		["#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"]
	), // Eine d3-Skala, in der Regel scaleQuantize, scaleQuantile oder scaleThreshold

	relief: "https://projekte.suedkurier.de/scripts/wolfrisse/ger.png", //Falls nötig eine URL als String zu einem png, das als Relief im Hintergrund der Karte liegen soll.

	smGroupVar: "group", // Variable, nach der gruppiert werden soll. Nur bei Small Multiples nötig.

	customFunctions: [], // Funktionen, die nach dem Mounting abgeschossen werden sollen.
};

export default config;
