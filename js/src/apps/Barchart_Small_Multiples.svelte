<script>
	import { LayerCake, Svg } from "layercake";
	import { onMount } from "svelte";
	import * as d3 from "d3";

	import AxisX from "../components/AxisX.svelte";
	import AxisY from "../components/AxisY.svelte";
	import Bar from "../components/Bar.svelte";

	import Intro from "../components/Intro.svelte";
	import Outro from "../components/Outro.svelte";

	export let config;
	export let data;

	export let titel = config.titel;
	export let subtitel = config.subtitel;
	export let quelle = config.quelle;
	export let suffix = config.suffix;
	export let format = config.format;
	export let labelThreshold = config.labelThreshold;
	export let paddingRight = config.paddingRight;
	export let paddingLeft = config.paddingLeft || 0;
	export let xKey = config.xKey;
	export let xGridlines = config.xGridlines;
	export let xTicks = config.xTicks;
	export let xSnapticks = config.xSnapticks;
	export let xTickMarks = config.xTickMarks;
	export let xMax = config.xMax;
	export let xMin = config.xMin;
	export let yKey = config.yKey;
	export let yGridlines = config.yGridlines;
	export let yTicks = config.yTicks;
	export let yTickMarks = config.yTickMarks;
	export let groupVar = config.groupVar;
	export let customFunctions = config.customFunctions;
	export let fill = config.color;

	data.forEach((d) => {
		d[xKey] = +d[xKey];
	});

	let yDomain = [...new Set(data.map((d) => d[yKey]))];
	let height = yDomain.length * (25 + 0.1) + yDomain.length * 4;

	if (xMax) {
		xMax = config.xMax;
	} else {
		xMax = d3.max(data, (d) => Math.ceil(d[xKey]));
	}

	if (xMin) {
		xMin = xMin;
	} else {
		xMin =
			d3.min(data, (d) => Math.ceil(d[xKey])) > 0
				? 0
				: d3.min(data, (d) => Math.ceil(d[xKey]));
	}

	let fulldata = [];

	export function reArrangeData() {
		let dataSeries = d3.group(data, (d) => d[config.groupVar]);
		dataSeries.forEach((item) => {
			fulldata.push(item);
		});
		fulldata = fulldata;
	}

	$: reArrangeData();

	let isMounted = false;
	onMount(() => {
		isMounted = true;
		customFunctions.forEach((func) => {
			func();
		});

		if (paddingLeft <= 0) {
			paddingLeft = yax.selectAll(".___tick").node().getBBox().width;
		}
	});

	let intro = {
		titel: titel,
		subtitel: subtitel,
		quelle: quelle,
	};
</script>

<div class="___chart_container">
	<Intro config={intro} />

	<div class="___chart_svg_container article-chart">
		{#each fulldata as data}
			<div
				class="___chart_sm_div"
				style="width:100%;height:{height + 30}px;">
				<div
					class="___chart_sm_title ___chart_sm_title_{data[0][
						groupVar
					]}"
					style="padding-left:{paddingLeft}px">
					{data[0][groupVar]}
				</div>
				<div style="height:{height}px;width:100%;">
					{#if isMounted}
						<LayerCake
							padding={{
								right: paddingRight,
								bottom: 0,
								left: paddingLeft,
							}}
							x={xKey}
							y={(d) => d[yKey]}
							yScale={d3.scaleBand().padding(0.1)}
							{yDomain}
							xDomain={[0, xMax]}
							{data}>
							<Svg>
								<AxisX
									snapTicks={xSnapticks}
									ticks={xTicks}
									gridlines={xGridlines}
									tickMarks={xTickMarks} />
								<AxisY
									ticks={yTicks}
									gridlines={yGridlines}
									tickMarks={yTickMarks} />
								<Bar
									{yKey}
									{xKey}
									{fill}
									{suffix}
									format={d3.format(format)}
									{labelThreshold} />
							</Svg>
						</LayerCake>
					{/if}
				</div>
			</div>
		{/each}
	</div>
	<Outro config={intro} />
</div>
