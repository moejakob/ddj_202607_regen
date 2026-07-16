<script>
	import maplibregl from "maplibre-gl";
	import "maplibre-gl/dist/maplibre-gl.css";

	export let config;
	export let data;

	export let height = config.height || "400px";
	export let cooperativeGestures = config.cooperativeGestures || true;
	export let maxBounds = config.maxBounds || undefined;
	export let center = config.center || [9.149485, 47.680738];
	export let bounds = config.bounds || undefined;
	export let zoom = config.zoom || 10;
	export let minZoom = config.minZoom || 8;
	export let maxZoom = config.maxZoom || 12;
	export let attributionControl = config.attributionControl || true;
	export let lon = config.lonValue || "lon";
	export let lat = config.latValue || "lat";
	export let fitMarker = config.fitMarker || true;
	export let markerBoundsPadding = config.markerBoundsPadding || 20;
	export let apiKey = import.meta.env.VITE_MAPTILER_KEY;

	let gestures = cooperativeGestures
		? {
				windowsHelpText: "Mit STRG + scroll zoomen",
				macHelpText: "Mit ⌘ + scroll zoomen",
				mobileHelpText: "Mit zwei Fingern zoomen",
		  }
		: false;

	data.forEach((element) => {
		element[lon] = Number.parseFloat(element[lon]);
		element[lat] = Number.parseFloat(element[lat]);
	});

	function rearrangeData(data) {
		let geojson = {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: [],
			},
		};

		data.forEach((element) => {
			let dict = {};

			(dict["type"] = "Feature"), (dict["properties"] = "");
			dict["geometry"] = {
				type: "Point",
				coordinates: [+element[lon], +element[lat]],
			};

			geojson["data"]["features"].push(dict);
		});

		return geojson;
	}

	let geojson = rearrangeData(data);

	export let baseMap =
		"https://api.maptiler.com/maps/d1e60c31-48ac-430e-b79c-c1d04504277f/style.json";

	let attr = attributionControl
		? new maplibregl.AttributionControl({
				compact: true,
				minimize: true,
		  })
		: attributionControl;

	function drawMap(element) {
		map = new maplibregl.Map({
			container: element, // container id
			style: baseMap + "?key=" + apiKey, // style URL
			cooperativeGestures: gestures,
			center: center,
			bounds: bounds,
			maxBounds: maxBounds,
			zoom: zoom,
			minZoom: minZoom,
			maxZoom: maxZoom,
			attributionControl: false,
		}).addControl(attr);
	}

	function drawMarker(data, map) {
		map.on("load", () => {
			map.addSource("places", geojson);
			// Add a layer showing the places.
			map.addLayer({
				id: "marker",
				type: "circle",
				source: "places",
				paint: {
					"circle-radius": 6,
					"circle-color": "#B42222",
				},
				filter: ["==", "$type", "Point"],
			});

			// Create a popup, but don't add it to the map yet.
			var popup = new maplibregl.Popup({
				closeButton: true,
				closeOnClick: true,
			});

			map.on("mouseenter", "marker", function (e) {
				// Change the cursor style as a UI indicator.
				map.getCanvas().style.cursor = "pointer";

				var coordinates = e.features[0].geometry.coordinates.slice();
				var description = e.features[0].properties.description;

				// Ensure that if the map is zoomed out such that multiple
				// copies of the feature are visible, the popup appears
				// over the copy being pointed to.
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] +=
						e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				// Populate the popup and set its coordinates
				// based on the feature found.
				popup.setLngLat(coordinates).setHTML(description).addTo(map);
			});

			map.on("mouseleave", "marker", function () {
				map.getCanvas().style.cursor = "";
				popup.remove();
			});
		});

		// data.forEach((element) => {
		// 	// create the popup
		// 	var popup = new maplibregl.Popup({
		// 		offset: 25,
		// 		closeButton: false,
		// 		closeOnClick: false,
		// 	}).setText(
		// 		"Construction on the Washington Monument began in 1848."
		// 	);
		// 	new maplibregl.Marker()
		// 		.setLngLat([element[lon], element[lat]])
		// 		.addTo(map);
		// });
	}

	function markerBounds(data) {
		let coordinates = data.map((d) => [+d[lon], +d[lat]]);

		return coordinates.reduce(function (bounds, coord) {
			return bounds.extend(coord);
		}, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));
	}

	function mapAction(container) {
		let map = drawMap(container);
		drawMarker(data, map);

		if (fitMarker) {
			let bounds = markerBounds(data);
			map.fitBounds(bounds, {
				padding: markerBoundsPadding,
			});
		}
	}
</script>

<div class="___chart_container">
	<div class="___chart_svg_container article-chart">
		<div id="___map" style="height:{height};" use:mapAction />
	</div>
</div>

<style>
	#___map {
		width: 100%;
		top: 0;
		bottom: 0;
	}
</style>
