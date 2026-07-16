<script>
	import { getContext, createEventDispatcher } from "svelte";
	import { geoPath } from "d3-geo";
	import { raise } from "layercake";

	const { data, width, height, zGet } = getContext("LayerCake");

	export let border;
	export let relief = false;

	/* --------------------------------------------
	 * Require a D3 projection function
	 */
	export let projection;
	export let bbox; // Bounding box to fit the map to

	/* --------------------------------------------
	 * Optional aspect ratio
	 */
	export let fixedAspectRatio = undefined;

	/* --------------------------------------------
	 * Allow for custom styling
	 */
	export let fill = "white"; // The fill will be determined by the scale, unless this prop is set
	export let stroke = "#878787";
	export let strokeWidth = 0.5;

	/* --------------------------------------------
	 * Add this optional export in case you want to plot only a subset of the features
	 * while keeping the zoom on the whole geojson feature set
	 */
	export let features = $data.features;
	export let borderFeatures = [];
	if (border) {
		border.forEach((b) => {
			borderFeatures.push(b.features);
		});
	}

	let borderElements = [];

	/* --------------------------------------------
	 * Here's how you would do cross-component hovers
	 */
	const dispatch = createEventDispatcher();

	$: fitSizeRange = fixedAspectRatio
		? [100, 100 / fixedAspectRatio]
		: [$width, $height];

	$: projectionFn = bbox
		? projection.fitExtent([[0, 0], fitSizeRange], bbox)
		: projection.fitSize(fitSizeRange, $data);

	$: geoPathFn = geoPath(projectionFn);

	function handleMousemove(feature) {
		return function handleMousemoveFn(e) {
			raise(this);
			borderElements.forEach((borderElement) => {
				raise(borderElement);
			});
			// When the element gets raised, it flashes 0,0 for a second so skip that
			if (e.layerX !== 0 && e.layerY !== 0) {
				dispatch("mousemove", { e, props: feature.properties });
			}
		};
	}

	function handleMouseEnter() {
		if (typeof _ti_update === "function") {
			_ti_update({ ct: "Content", ck13: "ddj-aktion" });
		}
	}
</script>

{#if relief}
	<g class="___map_relief">
		{#each features as feature}
			<path
				class="___map_choropleth_relief"
				fill="white"
				stroke="none"
				stroke-width="0"
				d={geoPathFn(feature)}
			/>
		{/each}
		<image
			class="___map_relief"
			clip-path="url(#___map_clip)"
			href={relief}
			width={fitSizeRange[0]}
			height={fitSizeRange[1]}
		/>
	</g>
{/if}
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<g class="___map_group" on:mouseout={(e) => dispatch("mouseout")}>
	{#each features as feature}
		<path
			class="___map_choropleth_path"
			fill={$zGet(feature.properties) || fill}
			{stroke}
			stroke-width={strokeWidth}
			d={geoPathFn(feature)}
			on:mouseover={(e) =>
				dispatch("mousemove", { e, props: feature.properties })}
			on:mousemove={handleMousemove(feature)}
			on:mouseenter={handleMouseEnter}
		/>
	{/each}
	{#if border}
		{#each borderFeatures as bFeature, i}
			<g bind:this={borderElements[i]}>
				{#each bFeature as feature}
					<path
						class="___map_choropleth_mesh ___map_border_{i}"
						fill="none"
						{stroke}
						stroke-width={strokeWidth + 0.5}
						d={geoPathFn(feature)}
					/>
				{/each}
			</g>
		{/each}
	{/if}
</g>
