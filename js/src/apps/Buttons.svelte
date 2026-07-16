<script>
	import Button from "../components/Button.svelte";

	let handleClick = (v) => {
		console.log("Button clicked " + v);
		for (let key in isWhite) {
			isWhite[key] = true;
		}
		isWhite[v] = !isWhite[v];
	};

	let isWhite = {
		0: true,
		1: false,
		2: true,
		3: true,
		4: true,
	};
</script>

<div class="___button_leiste">
	<Button
		white={isWhite[0]}
		label="Button"
		on:click={() => handleClick("0")}
	/>
	<Button
		white={isWhite[1]}
		label="Button"
		on:click={() => handleClick("1")}
	/>
	<Button
		white={isWhite[2]}
		label="Button"
		on:click={() => handleClick("2")}
	/>
	<Button
		white={isWhite[3]}
		label="Button"
		on:click={() => handleClick("3")}
	/>
	<Button
		white={isWhite[4]}
		label="Button"
		on:click={() => handleClick("4")}
	/>
</div>

<style>
	.___button_leiste {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
