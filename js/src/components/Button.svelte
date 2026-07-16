<script>
	// Optional: Exportiere Props für weitere Anpassungen wie `label`
	export let label = "Click me";
	export let white = true;
</script>

<button class="bt" class:bt-white={white} on:click>
	{label}
</button>
