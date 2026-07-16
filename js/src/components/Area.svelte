<script>
	import { getContext } from "svelte";
	import * as d3 from "d3";
	import { deUmlaut } from "./umlaute";

	const { data, xGet, yGet, xScale, yScale, extents, x, y } =
		getContext("LayerCake");

	export let fill = "#006ab2";
	export let colorKey;
	export let color;
	export let curve = d3.curveLinear;
	export let multi = false;

	$: areaGen = d3
		.area()
		.curve(curve)
		.x((d) => {
			return $xGet(d);
		})
		.y0($yScale(0))
		.y1((d) => $yGet(d))
		.defined((d) => !isNaN($yGet(d)));
</script>

<g class="___area_group">
	{#if multi}
		{#each $data as d}
			<path
				class="___area ___areacolor_{deUmlaut(d['key'])}"
				d={areaGen(d.values)}
				fill={color(d["key"])} />
		{/each}
	{:else}
		<path
			class="___area ___areacolor_{colorKey}"
			d={areaGen($data)}
			{fill} />
	{/if}
</g>
