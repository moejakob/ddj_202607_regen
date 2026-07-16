<script>
	import { createEventDispatcher } from "svelte";
	import maplibregl from "maplibre-gl";
	import "maplibre-gl/dist/maplibre-gl.css";
	import { select } from "d3-selection";

	let {
		mapContent,
		bbox = [
			7.513843247078176, 47.53349842525468, 10.491340057932366,
			49.7921098162,
		],
		bboxMax = [6.405, 46.5907, 10.9411, 48.5528],
	} = $props();

	let publicPath = import.meta.env.VITE_PUBLIC_PATH || "";
	let apiKey = import.meta.env.VITE_MAPTILER_KEY;
	let dispatch = createEventDispatcher();
	let el;


	let baseMap =
		"https://vapi.mc-cdn.io/styles/Suedkurier%20Online.json?access_token=NWZk3gYrXTb4MEQ2rDSTYmQWNAafHNqv5f1a8db27b76fbdaf36cdc34e316d3d9dd164dee";

	function drawMap(container) {
		let map = new maplibregl.Map({
			container: container,
			style: baseMap, // style URL
			center: [0, 0],
			bounds: bbox,
			maxBounds: bboxMax,
			zoom: 2,
			pitch: 0,
			pitchWithRotate: false,
			dragRotate: false,
			attributionControl: false,
			language: "de",
			interactive: true,
			cooperativeGestures: true,
			locale: {
				"CooperativeGesturesHandler.WindowsHelpText":
					"Verwenden Sie Strg + Scrollen, um die Karte zu zoomen.",
				"CooperativeGesturesHandler.MacHelpText":
					"Verwenden Sie ⌘ + Scrollen, um die Karte zu zoomen.",
				"CooperativeGesturesHandler.MobileHelpText":
					"Verwenden Sie zwei Finger, um die Karte zu bewegen.",
			},
		});

		let mapContainer = select(container);

		map.on("load", () => {
			const layers = map.getStyle().layers;
			console.log("🚀 ~ drawMap ~ layers:", layers);

			layers.forEach((layer) => {
				if (layer.type === "symbol") {
					// Nur Placename-Layer anzeigen (alle die mit "Placename" beginnen)
					if (layer.id.startsWith("Placename")) {
						map.setPaintProperty(layer.id, "text-color", "black");
						map.setPaintProperty(
							layer.id,
							"text-halo-color",
							"white"
						);
						map.setPaintProperty(layer.id, "text-halo-width", 1.5);
						map.setLayoutProperty(
							layer.id,
							"visibility",
							"visible"
						);
						map.setLayoutProperty(layer.id, "text-font", [
							"ArialMT",
						]);
						map.setLayoutProperty(
							layer.id,
							"text-letter-spacing",
							0.04
						);
						// map.setLayoutProperty(layer.id, "icon-size", 1);

						// Deutsche Bezeichnungen setzen
						map.setLayoutProperty(layer.id, "text-field", [
							"coalesce",
							["get", "name:de"],
							["get", "name"],
							["get", "name:en"],
						]);
					} else {
						// Alle anderen Symbol-Layer ausblenden
						map.setLayoutProperty(layer.id, "visibility", "none");
					}
				}
			});
		});

		dispatch("mapLoaded", { map, mapContainer });
	}
</script>

<div class="___chart_container">
	<div class="___chart_svg_container article-chart-big">
		<div id="___map" use:drawMap bind:this={el}>
			{@render mapContent?.()}
		</div>
	</div>
</div>

<style>
	#___map {
		width: 100%;
		top: 0;
		bottom: 0;
		height: max(50vh, 500px);
	}
</style>
