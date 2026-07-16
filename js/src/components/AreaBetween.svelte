<script>
	import { getContext } from "svelte";
	import * as d3 from "d3";

	const { data, x, y, xScale, yScale } = getContext("LayerCake");

	export let fill = "#006ab2";
	export let colorKey;
	export let keys = ["a", "c"];
	export let filteredData = $data.filter((d) => keys.includes(d.key));
	export let curve = d3.curveLinear;

	var points = [];

	var val1 = filteredData[0].values;
	var val2 = filteredData[1].values;

	val1.forEach((element, i) => {
		if (!isNaN($y(element))) {
			let dic = {};
			dic["x"] = $x(element);
			dic["high"] = $y(element);
			dic["low"] = $y(val2[i]);
			points.push(dic);
		}
	});

	$: areaGen = d3
		.area()
		.x((d) => {
			return $xScale(d.x);
		})
		.y0((d) => $yScale(d.low))
		.y1((d) => $yScale(d.high))
		.curve(curve);
</script>

<path class="___area ___areacolor_{colorKey}" d={areaGen(points)} {fill} />
