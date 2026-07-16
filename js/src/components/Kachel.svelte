<script>
	export let width = "150px";
	export let maxWidth = width;
	export let height = undefined;
	export let padding = "5px";
	export let margin = "5px";
</script>

<div
	class="___kachel"
	style="max-width: {maxWidth}; width: {width}; height: {height}; padding: {padding}; margin: {margin}">
	<slot />
</div>
