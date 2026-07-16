<script>
	export let foto1 =
		"https://i.ebayimg.com/images/g/FFMAAOSwiDxfjYbd/s-l400.jpg";
	export let foto2 =
		"https://www.bodenseeferien.de/storage/image/4/6/1/5/105164_doppelzimmer-select-lady_bofe-400x400_1C2P9s_HosBIS.jpg";

	export let height = undefined;
	export let width = undefined;

	let isDragging = false;
	let sliderPosition = 50;

	// Start dragging
	function startDrag(event) {
		isDragging = true;
		moveCircle(event);
	}

	// Move the circle
	function moveCircle(event) {
		if (!isDragging) return;
		const svg = event.currentTarget;
		const rect = svg.getBoundingClientRect();
		const newX = ((event.clientX - rect.left) / rect.width) * 100;
		sliderPosition = Math.max(0, Math.min(100, newX)); // Constrain between 0% and 100%
	}

	// Stop dragging
	function stopDrag() {
		isDragging = false;
	}
</script>

<div class="article-chart">
	<div class="___slider_container">
		<div
			class="___foto_resizer"
			bind:clientWidth={width}
			bind:clientHeight={height}
		>
			<img src={foto1} alt="Unsichtbares Foto" />
		</div>

		{#if width && height}
			<div
				class="___foto_1_container ___foto_container"
				style="background-image:url({foto1}); width:{width}px; height:{height}px;"
			></div>
			<div
				class="___foto_2_wrapper"
				style="width:{sliderPosition}%; height:{height}px;"
			>
				<div
					class="___foto_2_container ___foto_container"
					style="background-image:url({foto2}); width:{width}px; height:{height}px;"
				></div>
			</div>

			<div class="___divider_line" style="left: {sliderPosition}%"></div>
			<div class="___circle_container" style="top:0px; height:{height}px">
				<svg
					height="{height}px"
					width="{width}px"
					on:mousedown={startDrag}
					on:mousemove={moveCircle}
					on:mouseup={stopDrag}
					on:mouseleave={stopDrag}
					on:touchstart={startDrag}
					on:touchmove={moveCircle}
					on:touchend={stopDrag}
				>
					<circle
						class="___circle"
						r="12.5"
						cx={sliderPosition + "%"}
						cy="{height / 2}px"
						fill="white"
					/>
				</svg>
			</div>
		{/if}
	</div>
</div>

<style>
	.___foto_resizer {
		width: 100%;
		display: block;
		opacity: 0;
		pointer-events: none;
		min-height: 100px;
	}

	.___slider_container {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		box-sizing: border-box;
		overflow: hidden;
	}

	.___foto_container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.___foto_2_wrapper {
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.___divider_line {
		width: 5px;
		background-color: white;
		z-index: 100;
		height: 100%;
		position: absolute;
		transform: translateX(-50%);
	}

	.___circle_container {
		height: 25px;
		z-index: 100;
		position: absolute;
		width: 100%;
		top: 0px;
		left: 0px;
	}

	.___circle {
		cursor: col-resize;
	}
</style>
