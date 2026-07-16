<!--
  @component
  Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	/** @type {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
	import { getContext } from "svelte";

	const { data, width, height, zScale, z } = getContext("LayerCake");

	/* --------------------------------------------
	 * Require a D3 projection function
	 */
	export let projection;
	export let pointData;
	export let lon = "lon";
	export let lat = "lat";

	pointData.forEach((element) => {
		element[lon] = +element[lon];
		element[lat] = +element[lat];
		element["coord"] = [element[lon], element[lat]];
	});

	/** @type {Number} [r=3.5] - The point's radius. */
	export let r = 3.5;

	/** @type {String} [fill='yellow'] - The point's fill color. */
	export let fill = "hotpink";

	/** @type {String} [stroke='#000'] - The point's stroke color. */
	export let stroke = "#000";

	/** @type {Number} [strokeWidth=1] - The point's stroke width. */
	export let strokeWidth = 0.5;

	/** @type {Number} [opacity=1] - The point's opacity. */
	export let opacity = 1;

	$: projectionFn = projection().fitSize([$width, $height], $data);
</script>

<g class="___points_group">
	{#each pointData as point, i}
		<!-- To scale the circle by size, set r to `$rGet(d.properties)` -->
		<circle
			class="___point_circle ___point_circle_{i}"
			cx={projectionFn(point["coord"])[0]}
			cy={projectionFn(point["coord"])[1]}
			{r}
			fill={$zScale(point) || fill}
			{stroke}
			stroke-width={strokeWidth}
			{opacity} />
	{/each}
</g>
