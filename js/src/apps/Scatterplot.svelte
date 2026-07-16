<script>
	import { LayerCake, Svg, Html } from "layercake";
	import { onMount } from "svelte";
	import * as d3 from "d3";
	
	import AxisX from "../components/AxisX.svelte";
	import AxisY from "../components/AxisY.svelte";
	import Scatter from "../components/ScatterSVG.svelte";
	import Annotations from "../components/AnnotationsScatter.svelte";
	import Tooltip from './../components/Tooltip.svelte';

	import Intro from "../components/Intro.svelte";
	import Outro from "../components/Outro.svelte";

	export let config;
	export let data;
	export let annotations;

	const xKey = config.xKey;
	const yKey = config.yKey;
	const tooltipValues = config.tooltipValues;
	let format = config.format;

	let evt;
	let hideTooltip = false;

	data.forEach((d) => {
		d[xKey] = +d[xKey];
		d[yKey] = +d[yKey];
	});

	let height = 400;
	const titleCase = (val) => val.replace(/^\w/, (d) => d.toUpperCase());

	onMount( () => {
		config.customFunctions.forEach( func =>  {
			func()
		})
	})
</script>

<div class="___chart_container">
	<Intro {config} />

	<div
		class="___chart_svg_container article-chart"
		style="height:{height}px;">
		<LayerCake
			padding={{
				top: config.paddingBottom,
				right: config.paddingRight,
				bottom: config.paddingBottom,
				left: config.paddingLeft,
			}}
			x={xKey}
			y={yKey}
			xDomain={[config.xMin, config.xMax]}
			yDomain={[config.yMin, config.yMax]}
			{data}>
			<Svg>
				<AxisX
					snapTicks={config.xSnapticks}
					ticks={config.xTicks}
					gridlines={config.xGridlines}
					tickMarks={config.xTickMarks}
					xRotate={config.xRotate}
					label={config.xLabel} />
				<AxisY
					ticks={config.yTicks}
					gridlines={config.yGridlines}
					tickMarks={config.yTickMarks}
					suffix={config.suffixYAxis}
					label={config.yLabel} />
				<Scatter
					fill={config.fill}
					stroke={config.strokeColor}
					strokeWidth={config.strokeWidth}
					kenner={config.id}
					on:mousemove={(event) => (evt = hideTooltip = event)}
					on:mouseout={() => (hideTooltip = true)} />
				<Annotations {annotations} />
			</Svg>
			{#if config.tooltip}
			<Html pointerEvents={false}>
				{#if hideTooltip !== true}
					<Tooltip {evt} offset = {config.tooltipOffset} let:detail>
						{#each Object.entries(detail.props) as [key, value]}
							{#if tooltipValues.includes(key)}
								<div class="___tooltip_row">
									<span>{titleCase(key)}:</span>
									{typeof value === "number"
										? format(value) + " " + config.suffix
										: value}
								</div>
							{/if}
						{/each}
					</Tooltip>
				{/if}
			</Html>
			{/if}
		</LayerCake>
	</div>
	<Outro {config} />
</div>
