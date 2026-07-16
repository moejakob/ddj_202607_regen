<script>
	import { LayerCake, Svg } from "layercake";
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import calcPaddingLeft from "../helper/calcPaddingLeft";

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
	export let paddingLeft = config.paddingLeft || undefined;
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
	export let customFunctions = config.customFunctions;
	export let barHeight = 25;

	let el;
	data.forEach((d) => {
		d[xKey] = +d[xKey];
	});

	const isMobile = window.matchMedia("(max-width: 500px)").matches;

	let yDomain = data.map((d) => d[yKey]);
	let height = isMobile
		? yDomain.length * barHeight + yDomain.length * 5
		: yDomain.length * barHeight + yDomain.length * 10;

	let fill = config.color;

	if (xMax) {
		xMax = xMax;
	} else {
		xMax = d3.max(data, (d) => Math.ceil(d[xKey]));
	}

	if (xMin) {
		xMin = xMin;
	} else {
		xMin =
			d3.min(data, (d) => Math.ceil(d[xKey])) > 0
				? 0
				: d3.min(data, (d) =>
						Math.ceil(Math.round((d[xKey] / 10) * 10))
				  );
	}

	$: paddingLeft_ = paddingLeft || calcPaddingLeft(el, true);

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

	<div
		class="___chart_svg_container article-chart"
		style="height:{height}px;"
		bind:this={el}>
		<LayerCake
			padding={{
				top: 0,
				right: paddingRight,
				bottom: 0,
				left: paddingLeft_,
			}}
			x={xKey}
			y={(d) => d[yKey]}
			yScale={d3.scaleBand().padding(0.1)}
			{yDomain}
			xDomain={[xMin, xMax]}
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
					tickMarks={yTickMarks}
					{barHeight} />
				<Bar
					{yKey}
					{xKey}
					{fill}
					{suffix}
					{format}
					{labelThreshold}
					{barHeight} />
			</Svg>
		</LayerCake>
	</div>
	<Outro config={intro} />
</div>
