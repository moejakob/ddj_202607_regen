<script>
	import * as d3 from "d3";
	import { Legend } from "./legend";

	export let color;
	export let width = 290;
	export let format = d3.format(",.0f");
	export let title = "Hier steht ein Titel";

	$: reactiveColor = color;

	$: legendSVG = Legend(reactiveColor, {
		width: width,
		tickFormat: format,
		title: title,
	});
</script>

<div class="___map_legende ___chart_svg_container">
	{@html legendSVG.outerHTML}
</div>
