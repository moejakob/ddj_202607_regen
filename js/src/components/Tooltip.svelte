<script>
	import { getContext } from 'svelte';
	
	const { width } =
		getContext("LayerCake");

	export let evt = {};
	export let offset = 30;
	export let visible = true;
	export let w = 150
</script>

{#if evt.detail}
	<div
		class="___tooltip"
		style="
		width: {w}px;
		display: {visible ? 'block' : 'none'};
        top:{evt.detail.e.layerY - offset}px;
        left:{evt.detail.e.layerX < $width - w / 2 ? evt.detail.e.layerX : evt.detail.e.layerX - w /2}px;"
	>
		<slot detail={evt.detail} />
	</div>
{/if}
