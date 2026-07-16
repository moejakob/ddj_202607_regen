<script>
	import { getContext } from "svelte";
	import { deUmlaut } from "./umlaute";
	import * as d3 from "d3";

	const { data, xGet, yGet, config, y } = getContext("LayerCake");

	export let color;
	export let curve = d3.curveLinear;

	$: line = d3
		.line()
		.x((d) => $xGet(d))
		.y((d) => $yGet(d))
		.curve(curve)
		.defined((d) => !isNaN($yGet(d)));
</script>

<g class="___line_group">
	{#each $data as group}
		{#if color}
			<path
				class="___line ___line_{deUmlaut(
					String(group['key']).replace(' ', '')
				)}"
				d={line(group.values.filter((d) => !isNaN(d[$config.y])))}
				stroke={color(group["key"])} />
		{:else}
			<path
				class="___line"
				d={line(group.values.filter((d) => !isNaN(d[$config.y])))}
				stroke="hotpink" />
		{/if}
	{/each}
</g>
