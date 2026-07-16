<script>
	import { getContext } from "svelte";
	import * as d3 from "d3";

	const { data, width} =
    getContext("LayerCake");

    console.log("🚀 ~ file: Waffle.svelte ~ line 7 ~ height", $width)

	export let rectWidth = 25;
	export let rectHeight = 25;
	export let rectPerRow =  Math.floor($width / (rectWidth + 5));
    console.log("🚀 ~ file: Waffle.svelte ~ line 13 ~ rectPerRow", rectPerRow)

	let dataLength = $data.length;
	// export let rows = Math.ceil(dataLength / rectPerRow);
</script>

<g class="___waffle_group">
	{#each $data as d, i}
		<rect
			class="___waffle_rect"
			data-id={i}
			x={Math.ceil(i % rectPerRow) * rectWidth + Math.ceil(i % rectPerRow) * 5}
            y = {Math.floor((i) / rectPerRow) * rectHeight + Math.floor((i) / rectPerRow) * 5}
			height={rectHeight}
			width={rectWidth}
			fill="hotpink"
		/>
	{/each}
</g>

