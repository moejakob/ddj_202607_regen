<script>
	import { getContext } from "svelte";
	import { deUmlaut } from "./umlaute";

	const { padding, xRange, yScale, yRange } = getContext("LayerCake");

	export let ticks;
	export let tickMarks = false;
	export let gridlines = true;
	export let formatTick = (d) => d;
	export let xTick = 0;
	export let yTick = 0;
	export let dxTick = 0;
	export let dyTick = -4;
	export let textAnchor = "start";
	export let suffix = "";
	export let label;
	export let offset = 0;
	export let barHeight = undefined;

	if (label) {
		offset = 10;
	}

	$: isBandwidth = typeof $yScale.bandwidth === "function";

	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
		? $yScale.domain()
		: typeof ticks === "function"
		? ticks($yScale.ticks())
		: $yScale.ticks(ticks);

	let lastTick;

	try {
		lastTick =
			typeof ticks === "object"
				? ticks.length - 1
				: $yScale.ticks(ticks).length - 1;
	} catch (error) {
		lastTick = undefined;
	}

	$: middle = $yRange[0] / 2;
	$: bandW = barHeight ? barHeight : isBandwidth ? $yScale.bandwidth() : 0;
</script>

<g
	class="___axis ___y-axis"
	transform="translate({-$padding.left + offset} , 0)">
	<text
		class="___y-axis_label"
		transform="translate(0,{middle}) rotate(270)"
		text-anchor="middle">{label || ""}</text>
	{#each tickVals as tick, i}
		<g
			class="___tick ___tick-{deUmlaut(tick)}"
			tick={i}
			transform="translate({$xRange[0] +
				offset +
				(isBandwidth ? $padding.left : 0)}, {$yScale(tick)})">
			{#if gridlines !== false}
				<line
					class="___gridline"
					x2="100%"
					y1={yTick + (isBandwidth ? bandW / 2 : 0)}
					y2={yTick + (isBandwidth ? bandW / 2 : 0)} />
			{/if}
			{#if tickMarks === true}
				<line
					class="___tick-mark"
					x1="0"
					x2={isBandwidth ? -6 : 6}
					y1={yTick + (isBandwidth ? bandW / 2 : 0)}
					y2={yTick + (isBandwidth ? bandW / 2 : 0)} />
			{/if}

			{#if i === lastTick}
				<text
					x={xTick}
					y={yTick + (isBandwidth ? bandW / 2 : 0)}
					dx={isBandwidth ? -9 : dxTick}
					dy={isBandwidth ? 4 : dyTick}
					class={i}
					style="text-anchor:{isBandwidth ? 'end' : textAnchor};"
					>{formatTick(tick)} {" " + suffix}</text>
			{:else}
				<text
					x={xTick}
					y={yTick + (isBandwidth ? bandW / 2 : 0)}
					dx={isBandwidth ? -9 : dxTick}
					dy={isBandwidth ? 4 : dyTick}
					class={i}
					style="text-anchor:{isBandwidth ? 'end' : textAnchor};"
					>{formatTick(tick)}</text>
			{/if}
		</g>
	{/each}
</g>
