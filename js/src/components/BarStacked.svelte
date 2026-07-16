<script>
	import { getContext } from "svelte";
	import * as d3 from "d3"

	const { data, xGet, yGet, zGet, yScale, custom } = getContext("LayerCake");

	$: columnWidth = (d) => {
		const xVals = $xGet(d);
		return xVals[1] - xVals[0];
	};
</script>

<g class="___bar_group">
	{#each $data as series}
		{#each series as d, i}
			<rect
				class="___group_rect"
				data-id={i}
				x={$xGet(d)[0]}
				y={$yGet(d)}
				height={25}
				width={columnWidth(d)}
				fill={$zGet(series)}
			/>
		{/each}
	{/each}
</g>
