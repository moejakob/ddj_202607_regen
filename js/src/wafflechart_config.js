import * as d3 from "d3";

import de from "./components/german_locale";
d3.timeFormatDefaultLocale(de);
d3.formatDefaultLocale(de);

var config = {
	titel: "",
	subtitel: "",
	quelle: "Statistisches Landesamt",

	keyVar: "zimmer", // Die Variable, die dargestellt werden soll
	valueVar: "anzahl", // Die Variable, die die Anzahl der Icons gibt
	valueTeiler: 10, // Sollen die Anzahl geteilt werden?
	color: d3.scaleOrdinal(), // Eine D3-Skala ordinalskaliert. Alternativ können die Farben auch per CSS bestimmt werden.

	rectWidth: 18, // Wie breit sollen die Rechtecke sein?
	rectHeight: 18, // Wie hoch sollen sie sein?
	rectRadius: 20, // Sollen sie runde Ecken haben?

	customFunctions: [], // Funktionen, die nach dem Mounting abgeschossen werden sollen.
};

export default config;
