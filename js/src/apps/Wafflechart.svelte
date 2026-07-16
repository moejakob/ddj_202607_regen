<script>
	import { LayerCake } from "layercake";
	import { onMount } from "svelte";

	import Intro from "../components/Intro.svelte";
	import Outro from "../components/Outro.svelte";
	import Waffle from "../components/Waffle.svelte";

	export let data;
	export let config;

	let color = config.color;
	let key = config.keyVar;
	let value = config.valueVar;
	let teiler = config.valueTeiler;
	let rectWidth = config.rectWidth;
	let rectHeight = config.rectHeight;
	let rectRadius = config.rectRadius;

	onMount(() => {
		config.customFunctions.forEach((func) => {
			func();
		});
	});
</script>

<div class="___chart_container">
	<Intro {config} />

	<div class="___chart_svg_container">
		<LayerCake {data}>
			<Waffle
				rectColor={color}
				{key}
				{value}
				{teiler}
				{rectHeight}
				{rectWidth}
				{rectRadius} />
		</LayerCake>
	</div>
	<Outro {config} />
</div>
