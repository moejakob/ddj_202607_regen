<script>
	import DrawMap from "./CreateMap.svelte";

	let mapKey = $state(undefined);
	let mapContainer = $state(undefined);

	function handleMapLoaded(event) {
		mapKey = event.detail.map;
		mapContainer = event.detail.mapContainer;
	}
</script>

<DrawMap on:mapLoaded={handleMapLoaded} />
