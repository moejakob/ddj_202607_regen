<script>
	import { getContext } from "svelte";

	const { width, height, xScale, yRange, padding, xRange } =
		getContext("LayerCake");

	export let gridlines = true;
	export let tickMarks = true;
	export let formatTick = (d) => d;
	export let baseline = false;
	export let snapTicks = false;
	export let ticks = undefined;
	export let xTick = undefined;
	export let yTick = 16;
	export let dxTick = 0;
	export let dyTick = 0;
	export let xRotate = true;
	export let label;
	export let offset = 0;
	export let isLinechart = false;

	if (label) {
		offset = 20;
	}

	if (xRotate === true) {
		snapTicks = false;
	}

	$: isBandwidth = typeof $xScale.bandwidth === "function";

	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
		? $xScale.domain()
		: typeof ticks === "function"
		? ticks($xScale.ticks())
		: $xScale.ticks(ticks);

	function textAnchor(i) {
		if (snapTicks === true) {
			if (i === 0) {
				return "start";
			}
			if (i === tickVals.length - 1) {
				return "end";
			}
		}
		if (xRotate) {
			return "start";
		} else {
			return "middle";
		}
	}

	function rotateLabels() {
		if (xRotate === true) {
			return "rotate(45)";
		} else {
			return "rotate(0)";
		}
	}

	$: middle = $xRange[1] / 2;
</script>

<g class="___axis ___x-axis" class:snapTicks>
	<text
		class="___x-axis_label"
		transform="translate({middle},{$height + $padding.bottom})"
		text-anchor="middle">{label || ""}</text
	>
	{#each tickVals as tick, i}
		<g
			class="___tick ___tick-{i}"
			transform="translate({$xScale(tick)},{Math.max(
				$yRange[0],
				$yRange[1]
			)})"
		>
			{#if gridlines !== false}
				<line
					class="___gridline"
					y1={$height * -1}
					y2="0"
					x1="0"
					x2="0"
				/>
			{/if}
			{#if tickMarks === true}
				<line
					class="___tick-mark"
					y1={0}
					y2={6}
					x1={xTick || isBandwidth
						? isLinechart
							? 0
							: $xScale.bandwidth() / 2
						: 0}
					x2={xTick || isBandwidth
						? isLinechart
							? 0
							: $xScale.bandwidth() / 2
						: 0}
				/>
			{/if}
			<text
				x={xTick || isBandwidth
					? isLinechart
						? 0
						: $xScale.bandwidth() / 2
					: 0}
				y={yTick + 5}
				dx={dxTick}
				dy={dyTick + 5}
				transform={rotateLabels()}
				text-anchor={textAnchor(i)}
				>{formatTick(tick)}
			</text>
		</g>
	{/each}
	{#if baseline === true}
		<line
			class="___baseline"
			y1={$height + 0.5}
			y2={$height + 0.5}
			x1="0"
			x2={$width}
		/>
	{/if}
</g>
