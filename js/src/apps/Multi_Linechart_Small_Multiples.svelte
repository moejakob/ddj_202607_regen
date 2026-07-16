<script>
	import { onMount } from "svelte";
	import { LayerCake, Svg, Html } from "layercake";
	import * as d3 from "d3";
	import calcPaddingLeft from "../helper/calcPaddingLeft";

	import AxisX from "../components/AxisX.svelte";
	import AxisY from "../components/AxisY.svelte";
	import MultiLine from "../components/MultiLine.svelte";
	import SharedTooltip from "../components/SharedTooltipMultiline.svelte";
	import Annotations from "../components/Annotations.svelte";
	import AreaBetween from "../components/AreaBetween.svelte";
	import LineLegend from "../components/LineLegend.svelte";

	import Intro from "../components/Intro.svelte";
	import Outro from "../components/Outro.svelte";

	export let data;
	export let config;
	export let annotations;

	const xKey = config.xKey;
	const yKey = config.yKey;
	const zKey = "key";
	const height = config.smHeight;

	let fulldata = [];

	export function reArrangeData() {
		let dataSeries = d3.group(data, (d) => d[config.smGroupVar]);
		dataSeries.forEach((item) => {
			item.sort((a, b) =>
				d3.ascending(
					config.parseTime(a[xKey]),
					config.parseTime(b[xKey])
				)
			);
			fulldata.push(item);
		});
		fulldata = fulldata;
	}

	$: reArrangeData();

	// const seriesNames = Object.keys(data[0]).filter((d) => d !== xKey);
	export let seriesNames = config.seriesNames;

	export function dataLong(data) {
		data = seriesNames.map((key) => {
			return {
				key,
				values: data.map((d) => {
					d[xKey] =
						typeof d[xKey] === "string"
							? config.parseTime(d[xKey])
							: d[xKey]; // Conditional required for sapper
					return {
						key,
						[yKey]: +d[key],
						[xKey]: d[xKey],
					};
				}),
			};
		});
		return data.filter((d) => d.key != config.groupVar);
	}

	// Make a flat array of the `values` of our nested series
	// we can pluck the `value` field from each item in the array to measure extents
	const flatten = (data) =>
		data.reduce((memo, group) => {
			return memo.concat(group.values);
		}, []);

	let yMax;

	if (config.yMax > 0) {
		yMax = config.yMax;
	} else {
		let maxValues = [];
		let longData = dataLong(data);
		longData.forEach((element) => {
			let max = d3.max(element.values, (d) => d[yKey]);
			maxValues.push(max);
		});

		let y = d3
			.scaleLinear()
			.domain([0, d3.max(maxValues)])
			.nice();

		yMax = y.domain()[1];
	}

	let groupKeys = [...new Set(data.map((d) => d[config.smGroupVar]))];

	export function getColor(d, text = false) {
		if (config.lineColors) {
			let color = d3
				.scaleOrdinal()
				.domain(groupKeys)
				.range(config.lineColors);
			return color(d);
		} else {
			if (text) {
				return "#4B4B4D";
			} else {
				return config.color;
			}
		}
	}

	let el;
	$: paddingLeft = calcPaddingLeft(el);

	onMount(() => {
		config.customFunctions.forEach((func) => {
			func();
		});
	});
</script>

<div class="___chart_container">
	<Intro {config} />
	{#if config.legende}
		<LineLegend color={config.color} series={config.seriesNames} />
	{/if}
	<div class="___chart_svg_container article-chart" bind:this={el}>
		{#each fulldata as data}
			<div
				class="___chart_sm_div"
				style="width:100%;height:{height + 30}px;">
				<div
					class="___chart_sm_title ___chart_sm_title_{data[0][
						config.smGroupVar
					]}"
					style="color:{getColor(data[0][config.smGroupVar], true)}">
					{data[0][config.smGroupVar]}
				</div>
				<div style="height:{height}px">
					<LayerCake
						padding={{
							top: config.paddingTop,
							right: config.paddingRight,
							bottom: config.paddingBottom,
							left: paddingLeft,
						}}
						x={xKey}
						y={yKey}
						z={zKey}
						yDomain={[0, yMax]}
						xScale={d3.scaleTime()}
						flatData={flatten(dataLong(data))}
						data={dataLong(data)}>
						<Svg>
							<AxisX
								snapTicks={config.xSnapticks}
								ticks={config.xTicks}
								gridlines={config.xGridlines}
								tickMarks={config.xTickMarks}
								formatTick={config.timeFormat}
								xRotate={config.xRotate} />
							{#if config.suffixYAxis}
								<AxisY
									ticks={config.yTicks}
									gridlines={config.yGridlines}
									tickMarks={config.yTickMarks}
									suffix={config.suffix}
									formatTick={config.format} />
							{:else}
								<AxisY
									ticks={config.yTicks}
									gridlines={config.yGridlines}
									tickMarks={config.yTickMarks}
									formatTick={config.format} />
							{/if}

							{#if config.areaBetween}
								<AreaBetween
									fill={config.areaFill}
									keys={config.areaKeys} />
							{/if}
							<MultiLine
								color={config.color}
								curve={config.curve} />
							<Annotations
								parseTime={config.parseTime}
								{annotations} />
						</Svg>

						<Html>
							{#if config.tooltip}
								<SharedTooltip
									dataset={data}
									formatTitle={config.tooltipTimeFormat}
									formatValue={config.format}
									color={config.color}
									tooltipOffset={config.tooltipOffset}
									relevantKeys={config.relevantKeys}
									suffix={config.suffix} />
							{/if}
						</Html>
					</LayerCake>
				</div>
			</div>
		{/each}
	</div>
	<Outro {config} />
</div>
