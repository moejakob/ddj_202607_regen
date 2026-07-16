<script>
	import { LayerCake, Svg, Html, calcExtents } from "layercake";
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import { feature } from "topojson-client";

	import MapSvg from "../components/Map.svg.svelte";
	import MapLegend from "../components/MapLegend.svelte";
	import MapPoints from "../components/MapPoints.svelte";
	import Intro from "../components/Intro.svelte";
	import Outro from "../components/Outro.svelte";
	import Tooltip from "../components/Tooltip.svelte";
	import Annotations from "../components/MapAnnotations.svelte";

	export let config;
	export let data;
	export let shapes;
	export let annotations;
	export let pointData = undefined;

	export let titel = config.titel;
	export let subtitel = config.subtitel;
	export let quelle = config.quelle;

	export let colorKey = config.colorKey;
	export let joinKey = config.joinKey;
	export let choroTooltips = config.choroTooltips;
	export let pointRadius = config.pointRadius;
	export let pointClassName = config.pointClassName;

	export let format = config.format;
	export let tooltipValues = config.tooltipValues;
	export let suffix = config.suffix;

	export let legende = config.legende;
	export let legendeTitel = config.legendeTitel;
	export let legendeFormat = config.legendeFormat;
	export let legendeWidth = config.legendeWidth;

	export let paddingTop = config.paddingTop;
	export let paddingRight = config.paddingRight;
	export let paddingBottom = config.paddingBottom;
	export let paddingLeft = config.paddingLeft;

	export let height = config.height;
	export let relief = config.relief;
	export let color = config.scale;

	const dataLookup = new Map();

	data.forEach((item) => {
		item[colorKey] = +item[colorKey];
	});

	let objects_name = Object.keys(shapes.objects)[0];
	const geojson = feature(shapes, shapes.objects[objects_name]);
	const projection = d3.geoMercator();

	data.forEach((d) => {
		dataLookup.set(d[joinKey], d);
	});

	geojson.features.forEach((d) => {
		Object.assign(d.properties, dataLookup.get(d.properties[joinKey]));
	});

	const flatData = geojson.features.map((d) => d.properties);
	const dataExtent = calcExtents(flatData, { x: (d) => d[colorKey] });

	let domain = color.domain().length > 0 ? color.domain() : dataExtent["x"];

	let evt;
	let hideTooltip = false;

	const titleCase = (val) => val.replace(/^\w/, (d) => d.toUpperCase());

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

	<div class="___chart_svg_container article-chart" style="height:{height};">
		<LayerCake
			padding={{
				top: paddingTop,
				right: paddingRight,
				bottom: paddingBottom,
				left: paddingLeft,
			}}
			data={geojson}
			z={colorKey}
			zScale={color}
			zDomain={domain}
			zRange={color.range()}
			{flatData}>
			<Svg>
				<MapSvg
					{projection}
					{relief}
					on:mousemove={(event) => (evt = hideTooltip = event)}
					on:mouseout={() => (hideTooltip = true)} />
				<Annotations
					{annotations}
					projection={d3.geoMercator}
					{shapes} />
				{#if pointData}
					<MapPoints
						{pointData}
						projection={d3.geoMercator}
						r={pointRadius}
						className={pointClassName} />
				{/if}
			</Svg>
			<Html pointerEvents={false}>
				{#if choroTooltips}
					{#if hideTooltip !== true}
						<Tooltip {evt} let:detail>
							{#each Object.entries(detail.props) as [key, value]}
								{#if tooltipValues.includes(key)}
									<div class="___tooltip_row">
										<span>{titleCase(key)}:</span>
										{typeof value === "number"
											? format(value) + suffix
											: value}
									</div>
								{/if}
							{/each}
						</Tooltip>
					{/if}
				{/if}
			</Html>
		</LayerCake>
	</div>
	{#if legende}
		<MapLegend
			{color}
			title={legendeTitel}
			format={legendeFormat}
			width={legendeWidth} />
	{/if}
	<Outro config={intro} />
</div>
