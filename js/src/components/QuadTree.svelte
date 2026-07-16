<script>
	import { getContext } from "svelte";
	import * as d3 from "d3";

	const { data, xGet, yGet, width, height, xScale } = getContext("LayerCake");

	let visible = false;
	let found = {};
	let e = {};

	export let dataset = undefined;
	export let x = "x";
	export let y = "y";
	export let searchRadius = undefined;
	export let paddingRight = 10;
	export let paddingLeft = 25;

	$: xGetter = x === "x" ? $xGet : $yGet;
	$: yGetter = y === "y" ? $yGet : $xGet;

	function getOffset(evt) {
		var el = evt.target,
			x = 0,
			y = 0;

		while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
			x += el.offsetLeft + el.scrollLeft;
			y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}

		x = x + paddingLeft + paddingRight + 5;

		return { x: x, y: y };
	}

	function handleMouseEnter() {
		if (typeof _ti_update === "function") {
			_ti_update({ ct: "Content", ck13: "ddj-aktion" });
		}
	}

	function findItem(evt) {
		e = evt;
		var xLayerKey;
		var yLayerKey;

		if (e.type != "touchmove") {
			xLayerKey = `layer${x.toUpperCase()}`;
			yLayerKey = `layer${y.toUpperCase()}`;

			found =
				finder.find(evt[xLayerKey], evt[yLayerKey], searchRadius) || {};
			visible = Object.keys(found).length > 0;
		} else {
			e.preventDefault();

			let offset = getOffset(evt);

			xLayerKey = `client${x.toUpperCase()}`;
			yLayerKey = `client${y.toUpperCase()}`;

			found =
				finder.find(
					evt["touches"][0][xLayerKey] - offset["x"],
					evt["touches"][0][yLayerKey],
					searchRadius
				) || {};
			visible = Object.keys(found).length > 0;
		}
	}

	$: finder = d3
		.quadtree()
		.extent([
			[-1, -1],
			[$width + 1, $height + 1],
		])
		.x(xGetter)
		.y(yGetter)
		.addAll(dataset || $data);
</script>

<div
	class="___bg"
	on:touchmove={findItem}
	on:touchstart={findItem}
	on:mousemove={findItem}
	on:mouseout={() => (visible = false)}
	on:touchend={() => (visible = false)}
	on:blur={() => (visible = false)}
	on:mouseenter={handleMouseEnter}
/>
<slot x={xGetter(found) || 0} y={yGetter(found) || 0} {found} {visible} {e} />
