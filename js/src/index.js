import { mount } from "svelte";

import App from "./apps/Slider.svelte";
import "./styles/global.css";
import "./styles/custom_styles.css";

import config from "./linechart_config";
import data from "../../data/raw/line.csv";

import annotations from "./annotations";

import * as d3 from "d3";
import de from "./components/german_locale";
d3.timeFormatDefaultLocale(de);
d3.formatDefaultLocale(de);
let public_path = import.meta.env.VITE_PUBLIC_PATH || "";

// Mit public_path können Daten aus dem Ordner Public direkt geladen werden.
// Für den Build muss dabei die URL von VITE_PUBLIC_PATH in /envs/env.production angepasst werden
// Beispiel: d3.csv(public_path + "map_data.csv").then(d => console.log(d))
// Dadurch müssen extern geladene Daten nicht immer neu benannt werden. Sie muss nur alle im Ordner public liegen.

mount(App, {
	target: document.querySelector("#___chart"),
	props: {
		data: data,
		config: config,
		annotations: annotations,
	},
});
