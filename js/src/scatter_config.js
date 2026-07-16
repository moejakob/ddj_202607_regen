import * as d3 from "d3"
import de from "./components/german_locale";
d3.timeFormatDefaultLocale(de);
d3.formatDefaultLocale(de);

var config = {
  titel: "Hier steht eine Überschrift",
  subtitel: "Hier steht eine Unterzeile",
  quelle: "Hier steht eine Quelle",
  suffix: "Euro", // Suffix für die Beschriftung
  suffixYAxis: "Euro", // Soll der oberste Tick der yAchse den Suffix abbilden?
  format: d3.format(",.0f"), // ein d3.format

  tooltip: true, // Soll ein Tooltip abgebildet werden?
  tooltipOffset: 50, // An welcher Stelle soll der Tooltip stehen, berechnet von top
  tooltipValues: ["kreis","Frauen","Männer"], // Welche Variablen sollen im Tooltip angezeigt werden. 

  paddingTop: 15,
  paddingRight: 10,
  paddingBottom: 40,
  paddingLeft: 35,
  height: 250,

  xKey: "Frauen", // Das soll auf der X-Achse dargestellt werden
  xGridlines: false, // Wollen wir Gridlines? Falls ja, müssen xTicks eingestellt werden
  xTicks: 5, // Wollen wir Ticks auf der x-Achse? Wie viele?
  xSnapticks: true, // Sollen der erste und der letzte Tick leicht versetzt sein?
  xTickMarks: true, // Kleine Linien an den xTicks
  xRotate: false, // Sollen die X-Labels rotieren?
  xMin: 2000,
  xMax: 5000,
  xLabel: "Frauen", // Soll an der X-Achse ein Label stehen?
  
  yKey: "Männer", // Das soll auf der y-Achse dargestellt werden
  yGridlines: true,
  yTicks: 8,
  ySnapticks: false,
  yTickMarks: false,
  yMin: 2000, // Falls nötig: Minimale Ausprägung der y-Achse
  yMax: 5000, // Falls nötig: Maximale Ausprägung der y-Achse
  yLabel: "Männer", // Soll an der Y-Achse ein Label stehen?

  id: "bl", // Kenner im Datensatz, wird der Klasse des Punktes angehängt
  fill: "#a4a2a1", // welche Farbe sollen die Punkte haben?
  strokeColor: "white", // welche Farbe soll die Umrandung der Punkte haben?
  strokeWidth: 1, // Wie dick soll die Umrandung sein?

  smGroupVar: "group", // Variable, nach der gruppiert werden soll. Nur bei Small Multiples nötig.
  smHeight: 200, // Wie hoch sollen die SM sein?
  smLineColors: ["yellow", "red", "pink", "aqua"], // Sollen die SM-Linien unterschiedliche Farben haben? Falls ja, hier angeben

  customFunctions: [] // Funktionen, die nach dem Mounting abgeschossen werden sollen.
};

export default config;
