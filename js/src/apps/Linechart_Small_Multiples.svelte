<script>
	import { onMount } from "svelte";
	import { LayerCake, Svg, Html } from "layercake";
	import * as d3 from "d3";

	import AxisX from "../components/AxisX.svelte";
	import AxisY from "../components/AxisY.svelte";
	import Line from "../components/Line.svelte";
	import Area from "../components/Area.svelte";
	import SharedTooltip from "../components/SharedTooltip.svelte";
	import Annotations from "../components/Annotations.svelte";

	import Intro from "../components/Intro.svelte";
	import Outro from "../components/Outro.svelte";
	import calcPaddingLeft from "../helper/calcPaddingLeft";
	import { deUmlaut } from "../components/umlaute";

	export let data;
	export let config;
	export let annotations;

	const xKey = config.xKey;
	const yKey = config.yKey;
	const height = config.smHeight;

	data.forEach((d) => {
		d[yKey] = +d[yKey];
		d[xKey] = config.parseTime(d[xKey]);
	});

	let y = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d[yKey])])
		.nice();

	let yMax = config.yMax ? config.yMax : y.domain()[1];

	let groupKeys = [...new Set(data.map((d) => d[config.smGroupVar]))];

	export function getColor(d, text = false) {
		if (config.smLineColors) {
			let color = d3
				.scaleOrdinal()
				.domain(groupKeys)
				.range(config.smLineColors);
			return color(d);
		} else {
			if (text) {
				return "#4B4B4D";
			} else {
				return config.color;
			}
		}
	}

	let fulldata = [];

	export function reArrangeData() {
		let dataSeries = d3.group(data, (d) => d[config.smGroupVar]);
		dataSeries.forEach((item) => {
			item.sort((a, b) => d3.ascending(a[xKey], b[xKey]));
			fulldata.push(item);
		});
		fulldata = fulldata;
	}

	$: reArrangeData();

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

	<div class="___chart_svg_container article-chart" bind:this={el}>
		{#each fulldata as data, i}
			<div
				class="___chart_sm_div ___chart_sm_div_{deUmlaut(
					data[0][config.smGroupVar]
				)}"
				style="width:100%;height:auto;">
				<div
					class="___chart_sm_title ___chart_sm_title_{data[0][
						config.smGroupVar
					]}"
					style="padding-left:{config.paddingLeft}px;color:{getColor(
						data[0][config.smGroupVar],
						true
					)}">
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
						yDomain={[0, yMax]}
						{data}>
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
										style="stop-color: {config.color}; stop-opacity: 1;" /><stop
										offset="100%"
										style="stop-color: white; stop-opacity: 1;" /></linearGradient
								></defs>
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
							<Line stroke={config.smLineColors[i]} />
							{#if config.area}
								{#if config.lineargradient}
									<Area fill={"url(#___grad)"} />
								{:else}
									<Area fill={config.smLineColors[i]} />
								{/if}
							{/if}
							{#if annotations}
								<Annotations
									parseTime={config.parseTime}
									{annotations} />
							{/if}
						</Svg>
						{#if config.tooltip}
							<Html>
								<SharedTooltip
									dataset={data}
									formatValue={config.format}
									suffix={config.suffix}
									relevantKeys={config.tooltipRelevantKeys}
									tooltipOffset={config.tooltipOffset}
									formatTitle={config.timeFormat} />
							</Html>
						{/if}
					</LayerCake>
				</div>
			</div>
		{/each}
	</div>
	<Outro {config} />
</div>
