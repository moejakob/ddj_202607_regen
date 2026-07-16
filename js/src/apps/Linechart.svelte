<script>
	import { LayerCake, Svg, Html } from "layercake";
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import calcPaddingLeft from "../helper/calcPaddingLeft";

	import AxisX from "../components/AxisX.svelte";
	import AxisY from "../components/AxisY.svelte";
	import Line from "../components/Line.svelte";
	import Area from "../components/Area.svelte";
	import SharedTooltip from "../components/SharedTooltip.svelte";
	import Annotationen from "../components/Annotations.svelte";

	import Intro from "../components/Intro.svelte";
	import Outro from "../components/Outro.svelte";

	export let data;
	export let config;
	export let annotations;

	export let height = config.height;

	export let titel = config.titel;
	export let subtitel = config.subtitel;
	export let quelle = config.quelle;
	export let suffix = config.suffix;
	export let format = config.format;

	export let xKey = config.xKey;
	export let yKey = config.yKey;
	export let scaleTime = config.scaleTime;
	export let parseTime = config.parseTime;
	export let timeFormat = config.timeFormat;
	export let tooltipTimeFormat = config.tooltipTimeFormat;

	export let paddingTop = config.paddingTop;
	export let paddingRight = config.paddingRight;
	export let paddingBottom = config.paddingBottom;

	export let xGridlines = config.xGridlines;
	export let xTicks = config.xTicks;
	export let xSnapticks = config.xSnapticks;
	export let xTickMarks = config.xTickMarks;
	export let xRotate = config.xRotate;

	export let yGridlines = config.yGridlines;
	export let yTicks = config.yTicks;
	export let yTickMarks = config.yTickMarks;
	export let yMax = config.yMax;

	export let color = config.color;
	export let area = config.area;
	export let areaLineargradient = config.areaLineargradient;
	export let curve = config.curve;

	export let tooltip = config.tooltip;
	export let tooltipOffset = config.tooltipOffset;
	export let tooltipRelevantKeys = config.tooltipRelevantKeys;

	export let xScale = scaleTime
		? d3.scaleTime()
		: d3.scaleBand().paddingInner([0.02]).round(true);

	export let xDomain = data.map((d) => d[xKey]);

	let el;

	data.forEach((d) => {
		d[yKey] = +d[yKey];
		if (scaleTime) {
			d[xKey] =
				typeof d[xKey] == "string"
					? config.parseTime(d[xKey])
					: d[xKey];
		}
	});

	data.sort((a, b) => d3.ascending(a[xKey], b[xKey]));

	let y = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => Math.ceil(d[yKey]))])
		.nice();

	let yMax_;

	if (yMax) {
		yMax_ = yMax;
	} else {
		yMax_ = y.domain()[1];
	}

	$: paddingLeft = calcPaddingLeft(el);

	onMount(() => {
		config.customFunctions.forEach((func) => {
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

	<div
		class="___chart_svg_container article-chart"
		style="height:{height}px;"
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
			custom={color}
			yDomain={[0, yMax_]}
			{xScale}
			xDomain={scaleTime ? undefined : xDomain}
			{data}
		>
			<Svg>
				<defs>
					<linearGradient
						id="___grad"
						x1="0%"
						x2="0%"
						y1="0%"
						y2="100%"
						><stop
							offset="0%"
							style="stop-color: {color}; stop-opacity: 1;"
						/><stop
							offset="100%"
							style="stop-color: white; stop-opacity: 1;"
						/></linearGradient
					></defs
				>

				{#if scaleTime}
					<AxisX
						snapTicks={xSnapticks}
						ticks={xTicks}
						gridlines={xGridlines}
						tickMarks={xTickMarks}
						formatTick={timeFormat}
						{xRotate}
					/>
				{:else}
					<AxisX
						snapTicks={xSnapticks}
						ticks={xTicks}
						gridlines={xGridlines}
						tickMarks={xTickMarks}
						{xRotate}
						isLinechart={true}
					/>
				{/if}
				<AxisY
					ticks={yTicks}
					gridlines={yGridlines}
					tickMarks={yTickMarks}
					{suffix}
					formatTick={format}
				/>
				<Line stroke={color} {curve} />
				{#if area}
					{#if areaLineargradient}
						<Area fill={"url(#___grad)"} {curve} />
					{:else}
						<Area fill={color} {curve} />
					{/if}
				{/if}
				<Annotationen {parseTime} {annotations} />
			</Svg>

			{#if tooltip}
				<Html>
					{#if scaleTime}
						<SharedTooltip
							dataset={data}
							formatValue={format}
							{suffix}
							relevantKeys={tooltipRelevantKeys}
							{tooltipOffset}
							formatTitle={tooltipTimeFormat}
						/>
					{:else}
						<SharedTooltip
							dataset={data}
							formatValue={format}
							{suffix}
							relevantKeys={tooltipRelevantKeys}
							{tooltipOffset}
						/>
					{/if}
				</Html>
			{/if}
		</LayerCake>
	</div>
	<Outro config={intro} />
</div>
