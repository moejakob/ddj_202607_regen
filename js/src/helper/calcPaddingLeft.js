import * as d3 from "d3";

export default function calcPaddingLeft(element, barchart = false) {
	let svg = d3.select(element).selectAll("svg");
	let yTicks = svg
		.selectAll(".___y-axis")
		.selectAll(".___tick")
		.selectAll("text")
		.nodes();

	yTicks = yTicks.sort(function (x, y) {
		return d3.descending(x.getBBox().width, y.getBBox().width);
	});

	let secondTick = barchart
		? d3.select(yTicks[0]).node()
		: d3.select(yTicks[1]).node() || undefined;

	return secondTick ? secondTick.getBBox().width + 10 : 50;
}
