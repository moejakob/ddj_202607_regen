<script>
	import { LayerCake, Svg, Html } from "layercake";
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import calcPaddingLeft from "../helper/calcPaddingLeft";

	import AxisX from "../components/AxisX.svelte";
	import AxisY from "../components/AxisY.svelte";
	import MultiLine from "../components/MultiLine.svelte";
	import SharedTooltip from "../components/SharedTooltipMultiline.svelte";
	import Annotations from "../components/Annotations.svelte";
	import AreaBetween from "../components/AreaBetween.svelte";
	import Area from "../components/Area.svelte";
	import LineLegend from "./../components/LineLegend.svelte";

	import Intro from "../components/Intro.svelte";
	import Outro from "../components/Outro.svelte";

	export let data;
	export let config;
	export let annotations;

	export let titel = config.titel;
	export let subtitel = config.subtitel;
	export let quelle = config.quelle;
	export let suffix = config.suffix;
	export let suffixYAxis = config.suffixYAxis;
	export let format = config.format;
	export let parseTime = config.parseTime;
	export let timeFormat = config.timeFormat;
	export let tooltipTimeFormat = config.tooltipTimeFormat;
	export let seriesNames = config.seriesNames;
	export let legende = config.legende;
	export let tooltip = config.tooltip;
	export let tooltipOffset = config.tooltipOffset;
	export let relevantKeys = config.relevantKeys;
	export let paddingTop = config.paddingTop;
	export let paddingRight = config.paddingRight;
	export let paddingBottom = config.paddingBottom;
	export let paddingLeft = config.paddingLeft;
	export let height = config.height;
	export let xKey = config.xKey;
	export let xGridlines = config.xGridlines;
	export let xTicks = config.xTicks;
	export let xSnapticks = config.xSnapticks;
	export let xTickMarks = config.xTickMarks;
	export let xRotate = config.xRotate;
	export let yKey = config.yKey;
	export let yGridlines = config.yGridlines;
	export let yTicks = config.yTicks;
	export let yTickMarks = config.yTickMarks;
	export let yMax = config.yMax;
	export let yMin = config.yMin;
	export let color = config.color;
	export let curve = config.curve;
	export let areaBetween = config.areaBetween;
	export let areaKeys = config.areaKeys;
	export let areaFill = config.areaFill;
	export let customFunctions = config.customFunctions;

	const zKey = "key";
	let el;

	if (seriesNames) {
		seriesNames = seriesNames;
	} else {
		seriesNames = Object.keys(data[0]).filter((d) => d !== xKey);
	}

	const dataLong = seriesNames.map((key) => {
		return {
			key,
			values: data.map((d) => {
				d[xKey] =
					typeof d[xKey] === "string" ? parseTime(d[xKey]) : d[xKey]; // Conditional required for sapper
				return {
					key,
					[yKey]: isNaN(+d[key]) ? NaN : +d[key],
					[xKey]: d[xKey],
				};
			}),
		};
	});

	// Make a flat array of the `values` of our nested series
	// we can pluck the `value` field from each item in the array to measure extents
	const flatten = (data) =>
		data.reduce((memo, group) => {
			return memo.concat(group.values);
		}, []);

	let maxValues = [];
	let minValues = [];

	dataLong.forEach((element) => {
		let max = d3.max(element.values, (d) => d[yKey]);
		let min = d3.min(element.values, (d) => d[yKey]);
		maxValues.push(max);
		minValues.push(min);
	});

	let y = d3
		.scaleLinear()
		.domain([d3.min(minValues), d3.max(maxValues)])
		.nice();

	if (yMax == undefined) {
		yMax = y.domain()[1];
	}
	if (yMin == undefined) {
		yMin = y.domain()[0];
	}

	$: paddingLeft = calcPaddingLeft(el);

	onMount(() => {
		customFunctions.forEach((func) => {
			func();
		});
	});

	let intro = {
		titel: titel,
		subtitel: subtitel,
		quelle: quelle,
	};
</script>

<div class="___chart_container">
	<Intro config={intro} />
	{#if legende}
		<LineLegend {color} series={seriesNames} />
	{/if}
	<div
		class="___chart_svg_container article-chart"
		style="height:{height};"
		bind:this={el}
	>
		<LayerCake
			padding={{
				top: paddingTop,
				right: paddingRight,
				bottom: paddingBottom,
				left: paddingLeft,
			}}
			x={xKey}
			y={yKey}
			z={zKey}
			yDomain={[yMin, yMax]}
			xScale={d3.scaleTime()}
			flatData={flatten(dataLong)}
			data={dataLong}
		>
			<Svg>
				<AxisX
					snapTicks={xSnapticks}
					ticks={xTicks}
					gridlines={xGridlines}
					tickMarks={xTickMarks}
					formatTick={timeFormat}
					{xRotate}
				/>
				{#if suffixYAxis}
					<AxisY
						ticks={yTicks}
						gridlines={yGridlines}
						tickMarks={yTickMarks}
						{suffix}
						formatTick={format}
					/>
				{:else}
					<AxisY
						ticks={yTicks}
						gridlines={yGridlines}
						tickMarks={yTickMarks}
						formatTick={format}
					/>
				{/if}

				{#if areaBetween}
					<AreaBetween fill={areaFill} keys={areaKeys} {curve} />
				{/if}
				{#if config.area}
					<Area {curve} multi={true} {color} />
				{/if}

				<MultiLine {color} {curve} />
				<Annotations {parseTime} {annotations} />
			</Svg>

			<Html>
				{#if tooltip}
					<SharedTooltip
						dataset={data}
						formatTitle={tooltipTimeFormat}
						formatValue={format}
						{color}
						{tooltipOffset}
						{relevantKeys}
						{suffix}
					/>
				{/if}
			</Html>
		</LayerCake>
	</div>
	<Outro config={intro} />
</div>
