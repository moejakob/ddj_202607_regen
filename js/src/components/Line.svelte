<script>
	import { getContext } from "svelte";
	import { deUmlaut } from "./umlaute";
	import * as d3 from "d3";

	const { data, xGet, yGet, config } = getContext("LayerCake");

	export let stroke = "#006ab2";
	export let colorKey;
	export let curve = d3.curveLinear;

	$: undef = [];
	$: rub = [];

	$: $data.forEach((d, i) => {
		if (isNaN($yGet(d))) {
			let j = i + 1;
			if ($yGet($data[i - 1])) {
				rub.push($data[i - 1]);
			}
			if (j < $data.length) {
				while (isNaN($yGet($data[j]))) {
					j = j + 1;
				}
				rub.push($data[j]);
			}
			undef.push(rub);
			rub = [];
		}
	});

	$: line = d3
		.line()
		.curve(curve)
		.x((d) => $xGet(d))
		.y((d) => $yGet(d))
		.defined((d) => !isNaN($yGet(d)));
</script>

<g class="___line_group">
	<path
		class="___line ___linecolor_{deUmlaut(colorKey)}"
		d={line($data.filter((d) => !isNaN(d[$config.y])))}
		{stroke} />

	{#each undef as d}
		<path class="___line ___linecolor_undef" d={line(d)} {stroke} />
	{/each}
</g>

<style>
	.___linecolor_undef {
		stroke: grey;
		stroke-dasharray: 3;
	}
</style>
