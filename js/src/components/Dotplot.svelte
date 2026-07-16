<script>
	import { LayerCake, Svg } from "layercake";
	import * as d3 from "d3";

	import Dots from "../components/Dots.svelte";
	import AxisX from "../components/AxisX.svelte";
	import AxisY from "../components/AxisY.svelte";
	import Intro from "../components/Intro.svelte";
	import Outro from "../components/Outro.svelte";

	import calcPaddingLeft from "../helper/calcPaddingLeft";

	export let data;
	export let config;
	export let yKey = config.yKey || undefined;
	export let xKey =
		config.xKey || Object.keys(data[0]).filter((d) => d !== yKey);
	// export let height = config.height || "250px";

	export let titel = config.titel || "Hier steht ein Titel";
	export let subtitel = config.subtitel || "";
	export let quelle = config.quelle || "Hier steht eine Quelle";
	export let xTicks = config.xTicks || 5;

	export let paddingTop = config.paddingTop || 5;
	export let paddingRight = config.paddingRight || 5;
	export let paddingBottom = config.paddingBottom || 5;

	export let xMin = config.xMin || 0;
	export let xMax = config.xMax || null;

	export let seriesColors = config.seriesColors || ["#006ab2"];

	data.forEach((d) => {
		xKey.forEach((name) => {
			d[name] = +d[name];
		});
	});

	const isMobile = window.matchMedia("(max-width: 500px)").matches;

	let yDomain = data.map((d) => d[yKey]);
	let height = isMobile
		? yDomain.length * 25 + yDomain.length * 5
		: yDomain.length * 25 + yDomain.length * 10;

	let el;

	let intro = {
		titel: titel,
		subtitel: subtitel,
		quelle: quelle,
	};

	$: paddingLeft = calcPaddingLeft(el, true);
</script>

<div class="___chart_container">
	<Intro config={intro} />

	<div
		class="___chart_svg_container article-chart"
		style="height:{height}px;"
		bind:this={el}
	>
		{#if yKey}
			<LayerCake
				padding={{
					top: paddingTop,
					right: paddingRight,
					bottom: paddingBottom,
					left: paddingLeft,
				}}
				x={xKey}
				y={yKey}
				yScale={d3.scaleBand().paddingInner(0.05).round(true)}
				xDomain={[xMin, xMax]}
				xPadding={[10, 0]}
				zScale={d3.scaleOrdinal()}
				zDomain={xKey}
				zRange={seriesColors}
				{data}
			>
				<Svg>
					<AxisX
						snapTicks={false}
						ticks={xTicks}
						isLinechart={true}
						xRotate={0}
					/>
					<AxisY gridlines={false} tickMarks={true} />
					<Dots />
				</Svg>
			</LayerCake>
		{/if}
	</div>
	<Outro config={intro} />
</div>
