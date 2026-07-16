<script>
	import { getContext, onMount } from "svelte";
	import * as d3 from "d3";
	import { deUmlaut } from "./umlaute";

	const { data } = getContext("LayerCake");

	export let rectWidth = 25;
	export let rectHeight = 25;
	export let rectRadius = 25;
	export let rectColor = "green";
	export let key = "";
	export let value = "";
	export let teiler = 1;

	onMount(() => {
		let waffel = d3.selectAll(".___waffle");
		waffel.on("mouseover touchstart touchmove", mouseover);
		waffel.on("mouseout touchend", mouseout);
		function mouseover() {
			d3.select(this).style("opacity", 0.5);
		}
		function mouseout() {
			waffel.style("opacity", 1);
		}
	});
</script>

<div class="___waffle_group">
	{#each $data as d, i}
		{#each Array(Math.round(+d[value] / teiler)) as _, index (index)}
			<div
				class="___waffle ___waffle_{deUmlaut(d[key])}"
				style="width:{rectWidth}px;height:{rectHeight}px;margin:3px;border-radius:{rectRadius}px;background-color:{rectColor(
					d[key]
				)}" />
		{/each}
	{/each}
</div>
