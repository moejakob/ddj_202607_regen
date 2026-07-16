<script>
	import * as d3 from "d3";
	import * as L from "leaflet";
	import { onMount } from "svelte";

	import Intro from "../components/Intro.svelte";
	import Outro from "../components/Outro.svelte";

	export let config;
	export let bbox = config.bbox;
	export let markerData;

	let map;

	var basemap = L.tileLayer(config.basemap_url, {
		tileSize: 512,
		zoomOffset: -1,
		attribution: config.basemap_attribution,
		crossOrigin: true,
	});

	function draw_map(container) {
		map = L.map(container, {
			zoomSnap: 0.1,
			minZoom: config.minZoom,
			maxZoom: config.maxZoom,
		});

		map.fitBounds(bbox);

		map.addLayer(basemap);

		if (config.disable_all) {
			map.dragging.disable();
			map.touchZoom.disable();
			map.doubleClickZoom.disable();
			map.scrollWheelZoom.disable();
			map.boxZoom.disable();
			map.keyboard.disable();
			if (map.tap) map.tap.disable();
		}

		if (config.disable_drag) {
			map.dragging.disable();
			map.keyboard.disable();
			// if (map.tap) map.tap.disable();
		}

		if (config.hide_control) {
			let mapContainer = d3.select(container);
			mapContainer
				.select(".leaflet-control-zoom")
				.style("display", "none");
		}

		return map;

		//     var isEnabled = false;
		//     disableMap();

		//     container
		//         .append("div")
		//         .attr("style", "position:absolute;z-index:1000;top:10px;right:10px")
		//         .append("button")
		//         .attr("class", "activate bt bt-white")
		//         .style("background-color", "white")
		//         .style("padding", "10px 20px")
		//         .html("Karte steuern");

		//     const activateButton = document.querySelector(".activate");
		//     activateButton.addEventListener("click", () => {
		// 	if (isEnabled) {
		// 		activateButton.innerHTML = "Karte steuen";
		// 		disableMap();
		// 	} else {
		// 		activateButton.innerHTML = "Karte einfrieren";
		// 		enableMap();
		// 	}
		// 	isEnabled = !isEnabled;
		// });

		// function disableMap() {
		// 	map.dragging.disable();
		// 	map.touchZoom.disable();
		// 	map.doubleClickZoom.disable();
		// 	map.scrollWheelZoom.disable();
		// 	map.boxZoom.disable();
		// 	map.keyboard.disable();
		// 	if (map.tap) map.tap.disable();
		// 	document.querySelector("#map").style.cursor = "default";
		//     }
	}

	function create_popup_string(values, d) {
		let string = "";
		values.forEach((value) => (string = string + d[value] + "<br>"));

		return string;
	}

	function draw_marker(map) {
		markerData.forEach(function (d, i) {
			var circle = L.circle([d.lat, d.lng], {
				radius: config.circle_radius,
				className: "___marker ___marker_" + i,
			}).addTo(map);

			if (config.popup) {
				circle.bindPopup(create_popup_string(config.popup_values, d));
				circle.on("mouseover", function (e) {
					this.openPopup();
				});
				circle.on("mouseout", function (e) {
					this.closePopup();
				});
			}
		});
	}

	function mapAction(container) {
		let map = draw_map(container);
		draw_marker(map);
	}

	onMount(() => {
		config.customFunctions.forEach((func) => {
			func();
		});
	});
</script>

<div class="___chart_container">
	<Intro {config} />

	<div class="___chart_svg_container article-chart">
		<div id="___map" use:mapAction style="height:{config.height};" />
	</div>

	<Outro {config} />
</div>

<style>
	#___map {
		width: 100%;
	}
</style>
