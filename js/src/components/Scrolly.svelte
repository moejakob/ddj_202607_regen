<script>
	import Scroller from "@sveltejs/svelte-scroller";
	import * as d3 from "d3";

	export let texte = {
		0: "Hallo 0",
		1: "Hallo 1",
	};

	export let threshold = 0.9;
	let count;
	let offset;
	let progress;
	let top = 1;
	let bottom = 1;
	let width;

	$: isMobile = window.matchMedia("(max-width: 500px)").matches;
	$: chartHeight = 250;

	let svg;
	let el;

	export let actions_ = {
		0: () => {
			console.log("0");
		},
		1: () => {
			console.log("1");
		},
		2: () => {
			console.log("2");
		},
	};

	$: actions = typeof actions_ == "function" ? actions_(svg) : actions_;

	// Reactive code to trigger actions_
	let index_ = [];
	let index_Prev = [];
	$: if (index_[0] != index_Prev[0]) {
		if (index_[0] > index_Prev) {
			if (actions[+index_[0]]) {
				actions[+index_[0]]("down");
			}
			index_Prev[0] = index_[0];
			if (typeof _ti_update === "function") {
				_ti_update({ ct: "Content", ck13: "ddj-aktion" });
			}
		} else {
			if (actions[+index_[0]]) {
				actions[+index_[0]]("up");
			}
			index_Prev[0] = index_[0];
			if (typeof _ti_update === "function") {
				_ti_update({ ct: "Content", ck13: "ddj-aktion" });
			}
		}
	}

	function calcBottomTop(chartHeight) {
		let windowHeight = window.innerHeight; //Höhe des Viewports
		let visibleArea = isMobile ? windowHeight - 50 : windowHeight - 130; // Höhe des VP abzgl. der Leiste

		let offsetTop = isMobile // Mittlere Position des Charts im sichtbaren Bereich, gemessen vom oberen Bildschirmrand
			? (visibleArea - chartHeight) / 2 + 38 // Plus die Höhe der Leiste, um es in der Mitte des sichtbaren Bereichs anzuheften
			: (visibleArea - chartHeight) / 2 + 74;

		let fullHeight = offsetTop + chartHeight + 25; // Komplette Höhe, um bottom zu berechnen. Außerdem plus 25px für den Abstand zwischen Text und Chart
		top = offsetTop / windowHeight;
		bottom = fullHeight / windowHeight;
	}

	$: calcBottomTop(chartHeight);
	$: svg = d3.select(el);
</script>

<div id="___scrolly" bind:this={el} class="___zoom" bind:clientWidth={width}>
	<Scroller
		{top}
		{threshold}
		{bottom}
		bind:count
		bind:index={index_[0]}
		bind:offset
		bind:progress
	>
		<div slot="background" bind:clientHeight={chartHeight}>
			<slot />
		</div>
		<div slot="foreground">
			{#each Object.entries(texte) as [key, text]}
				<section class="___scrolly_section ___scrolly_section_{key}">
					<div
						class="___scrolly_background ___scrolly_background_{key}"
					>
						<p
							class="mb-6 text-xs md:text-m lg:text-l font-serif group-[.font-sans]:font-sans"
						>
							{@html text}
						</p>
					</div>
				</section>
			{/each}
		</div>
	</Scroller>
</div>

<style>
	[slot="foreground"] {
		pointer-events: none;
		width: 100%;
		max-width: 468px;
		margin: 0 auto;
	}

	[slot="foreground"] section {
		pointer-events: all;
		padding-bottom: 100vh;
	}

	/* @media (-webkit-device-pixel-ratio: 1.5) {
		.___zoom {
			zoom: 0.75;
		}
	}
	@media (-webkit-device-pixel-ratio: 1.75) {
		.___zoom {
			zoom: 0.8;
		}
	} */
</style>
