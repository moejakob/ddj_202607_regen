<script>
	import { getContext } from "svelte";
	import { deUmlaut } from "./umlaute";
	const { data, xGet, yGet, xScale, x } = getContext("LayerCake");

	export let fill;
	export let yKey;
	export let xKey;
	export let suffix;
	export let format;
	export let labelThreshold;
	export let barHeight = 25;

	let textBase = barHeight * 0.7;
</script>

<g class="___bar-group">
	{#each $data as d, i}
		<rect
			class="___bar_rects ___bar_rect_{deUmlaut(d[yKey])} {$x(d) < 0
				? '___bar_rects_negativ'
				: '___bar_rects_positiv'}"
			data-id={i}
			x={Math.min($xScale(0), $xGet(d))}
			y={$yGet(d)}
			height={barHeight}
			width={Math.abs($xGet(d) - $xScale(0))}
			{fill} />
		{#if Math.abs($x(d)) < labelThreshold}
			{#if $x(d) > 0}
				<text
					class="___chart_label"
					text-anchor="start"
					x={$xGet(d) + 10}
					y={$yGet(d)}
					dy={textBase}>{format(d[xKey])} {" " + suffix}</text>
			{:else}
				<text
					class="___chart_label"
					text-anchor="end"
					x={$xGet(d) - 10}
					y={$yGet(d)}
					dy={textBase}>{format(d[xKey])} {" " + suffix}</text>
			{/if}
		{:else if $x(d) > 0}
			<text
				class="___chart_label ___chart_label_{deUmlaut(
					d[yKey]
				)} ___chart_label_inner"
				text-anchor="end"
				x={$xGet(d) - 10}
				y={$yGet(d)}
				dy={textBase}>{format(d[xKey])} {" " + suffix}</text>
		{:else}
			<text
				class="___chart_label ___chart_label_{deUmlaut(
					d[yKey]
				)} ___chart_label_inner"
				text-anchor="start"
				x={$xGet(d) + 10}
				y={$yGet(d)}
				dy={textBase}>{format(d[xKey])} {" " + suffix}</text>
		{/if}
	{/each}
</g>
