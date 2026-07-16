<!--
  @component
  Generates an SVG scatter plot. This component can also work if the x- or y-scale is ordinal, i.e. it has a `.bandwidth` method. See the [timeplot chart](https://layercake.graphics/example/Timeplot) for an example.
 -->
<script>
	import { getContext, createEventDispatcher } from "svelte";
	import { deUmlaut } from "./umlaute";
	import { raise } from "layercake";

	const { data, xGet, yGet, xScale, yScale, xDomain, yDomain } =
		getContext("LayerCake");

	/** @type {Number} [r=5] – The circle's radius. */
	export let r = 5;

	/** @type {String} [fill='#0cf'] – The circle's fill color. */
	export let fill = "hotpink";

	/** @type {String} [stroke='#000'] – The circle's stroke color. */
	export let stroke = "white";

	/** @type {Number} [strokeWidth=0] – The circle's stroke width. */
	export let strokeWidth = 1;

	export let kenner;
	const dispatch = createEventDispatcher();

	function handleMousemove(d) {
		return function handleMousemoveFn(e) {
			raise(this);
			// When the element gets raised, it flashes 0,0 for a second so skip that
			if (e.layerX !== 0 && e.layerY !== 0) {
				dispatch("mousemove", { e, props: d });
			}
		};
	}
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<g class="___scatter_group" on:mouseout={(e) => dispatch("mouseout")}>
	{#each $data as d}
		<circle
			class="___scatter_circle_{deUmlaut(d[kenner])}"
			cx={$xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0)}
			cy={$yGet(d) + ($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0)}
			{r}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
			on:mouseover={(e) =>
				dispatch("mousemove", { e, props: d })}
			on:mousemove={handleMousemove(d)} />
	{/each}
</g>
<g class="___scatter_line">
	<line
		x1={$xScale($xDomain[0])}
		x2={$xScale($xDomain[1])}
		y1={$yScale($yDomain[0])}
		y2={$yScale($yDomain[1])}
		stroke="#4b4b4d" />
</g>
