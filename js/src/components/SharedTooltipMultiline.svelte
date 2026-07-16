<script>
	import { getContext } from "svelte";
	import { format } from "d3-format";

	import QuadTree from "./QuadTree.svelte";

	const { data, width, yScale, config } = getContext("LayerCake");

	const commas = format(",");
	const titleCase = (d) => d.replace(/^\w/, (w) => w.toUpperCase());

	export let tooltipOffset = 20;
	export let dataset = undefined;
	export let formatTitle = (d) => d;
	export let formatKey = (d) => titleCase(d);
	export let formatValue = (d) => (isNaN(+d) ? d : commas(d));
	export let color;
	export let relevantKeys = [];
	export let suffix;

	const w = 150;
	const w2 = w / 2;
	let top = 0;

	/* --------------------------------------------
	 * Sort the keys by the highest value
	 */
	function sortResult(result) {
		if (Object.keys(result).length === 0) return [];
		const rows = Object.keys(result)
			.filter((d) => d !== $config.x)
			.map((key) => {
				return {
					key,
					value: result[key],
				};
			});
		// .sort((a, b) => b.value - a.value);

		return rows;
	}
</script>

<QuadTree
	dataset={dataset || $data}
	y="x"
	let:x
	let:y
	let:visible
	let:found
	let:e>
	{#if visible === true}
		<div style="left:{x}px;" class="___tooltip_line" />
		<div
			class="___tooltip"
			style="width:{w}px;display: {visible ? 'block' : 'none'};
				top:{tooltipOffset}px;left:{Math.min(Math.max(w2, x), $width - w2)}px;">
			<div class="___tooltip_title">{formatTitle(found[$config.x])}</div>
			{#each sortResult(found) as row}
				{#if relevantKeys.includes(row.key)}
					<div class="___tooltip_row">
						<span
							class="___tooltip_key"
							style="color:{color(row.key)}"
							>{formatKey(row.key)}:</span>
						{formatValue(row.value)}
						{suffix}
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</QuadTree>
