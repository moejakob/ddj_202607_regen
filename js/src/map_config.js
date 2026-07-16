import * as d3 from "d3";
import de from "./components/german_locale";
d3.timeFormatDefaultLocale(de);
d3.formatDefaultLocale(de);

var config = {
	titel: "Hier steht eine Überschrift",
	subtitel: "Hier steht eine Unterzeile",
	quelle: "Hier steht eine Quelle",

	lonValue: "lng", // Variable der Längengrade
	latValue: "lat", // Variable der Breitengrade
	fitMarker: true, // Soll die Bbox der Marker berechnet werden?
	markerBoundsPadding: 100, // Falls fitMarker: Padding der BBox zum Rand

	height: "400px", // Wie hoch soll die Karte sein
	cooperativeGestures: true, // Soll die Karte mit STRG bzw. zwei Fingern gezoomt werden dürfen?

	center: [9.149485, 47.680738], // Der Mittelpunkt der Karte
	bounds: undefined, // Eine Bounding-Box mit lnglat, überschreibt center
	maxBounds: undefined, // Wie weit soll der User die Karte ziehen dürfen?

	zoom: 10, // Der Zoom der Karte
	minZoom: 1, // minimal möglicher Zoom
	maxZoom: 25, // maximal möglicher Zoom

	attributionControl: true, // Soll die Quelle in der Karte stehen?
};

// var config = {
//     titel: "Hier steht eine Überschrift",
//     subtitel: "Hier steht eine Unterzeile",
//     quelle: "Hier steht eine Quelle",

//     format: d3.format(",.0f"), // ein d3.format
//     parseTime: d3.timeParse("%Y-%m-%d"),
//     timeFormat: d3.timeFormat("%b %y"),
//     tooltipTimeFormat: d3.timeFormat("%b.%Y"),

//     height: '400px',

//     bbox: [
//         [47.5873, 7.3302],
//         [47.908, 8.9299],
//     ],

//     maxZoom: 16,
//     minZoom: 6,

//     basemap_url: 'https://api.maptiler.com/maps/4e6e1c09-18db-4bac-afd0-296250bff234/{z}/{x}/{y}.png?key=0awS8NqOUas5Iz3AO97T',
//     basemap_attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",

//     // zoom, dragging,...
//     disable_all: true,
//     disable_drag: true,

//     // Zoom-Control-Buttons
//     hide_control: true,

//     // Marker
//     circle_radius: 700,

//     // Popup
//     popup: true,
//     popup_values: ["place", "brand"],

//     customFunctions: [] // Funktionen, die nach dem Mounting abgeschossen werden sollen.
// };

export default config;
