<script>
	export let color;
	export let series;

	function capitalize(string) {
		let lowerString = string.toLowerCase();
		let firstLetter = lowerString.charAt(0).toUpperCase();
		let upperString = firstLetter + string.slice(1);

		return upperString;
	}
</script>

<div id="___chart_legend_container">
	<ul>
		{#each series as element}
			<li>
				<span style="background-color:{color(element)};" />
				<p>{capitalize(element)}</p>
			</li>
		{/each}
	</ul>
</div>

<style>
	#___chart_legend_container {
		font-family: "Franklin Gothic", "Arial Narrow", Arial, sans-serif;
		font-size: 16px;
		fill: var(--main-text-color);
	}

	#___chart_legend_container ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		margin: 0px;
		padding: 0px;
	}
	#___chart_legend_container li {
		align-items: center;
		cursor: pointer;
		display: flex;
		flex-direction: row;
	}
	#___chart_legend_container li span {
		width: 20px;
		height: 5px;
		margin-left: 0;
		margin-right: 5px;
	}

	#___chart_legend_container li p {
		margin-right: 10px;
	}
</style>
