<script>
	// Event zum Übermitteln des ausgewählten Keys an die Parent-Komponente
	import { createEventDispatcher } from "svelte";
	import { onMount, onDestroy } from "svelte";

	export let items = []; // Erwarte ein Array von Objekten mit `key` und `value`
	export let placeholder = "Suche...";
	export let unknown = "Keine Ergebnisse gefunden";

	export let key = "key";
	export let value = "value";

	let input = "";
	let filteredItems = [];
	let selectedIndex = -1; // Initialwert, bedeutet keine Auswahl

	// Funktion zum Filtern der Items basierend auf dem `value`
	function updateFilteredItems(v) {
		filteredItems = items.filter((item) =>
			item[value].toLowerCase().startsWith(v.toLowerCase())
		);
	}

	function handleInput(event) {
		input = event.target.value;
		updateFilteredItems(input);
	}

	const dispatch = createEventDispatcher();

	function selectItem(item) {
		input = item[value]; // Setze das Input-Feld auf den gewählten Wert
		filteredItems = []; // Leere die Liste der gefilterten Items
		selected = item[key];
		dispatch("select", item[key]); // Übermittle den Key an die Parent-Komponente
	}

	function handleKeydown(event) {
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault(); // Verhindert das Scrollen der Seite
				if (selectedIndex < filteredItems.length - 1) {
					selectedIndex++;
				}
				break;
			case "ArrowUp":
				event.preventDefault(); // Verhindert das Scrollen der Seite
				if (selectedIndex > 0) {
					selectedIndex--;
				}
				break;
			case "Enter":
				if (selectedIndex > -1 && filteredItems.length > 0) {
					selectItem(filteredItems[selectedIndex]);
					filteredItems = [];
					selectedIndex = -1;
				}
				break;
			case "Escape":
				filteredItems = [];
				selectedIndex = -1;
				break;
		}
	}

	function closeSuggestions() {
		filteredItems = [];
	}

	function handleBlur(event) {
		// Verzögerung, um Click-Events auf Vorschläge zu erlauben, bevor die Liste geschlossen wird
		setTimeout(() => {
			closeSuggestions();
		}, 200);
	}

	function handleClickOutside(event) {
		if (!event.target.closest(".___input")) {
			closeSuggestions();
			// input = "";
		}
	}

	onMount(() => {
		document.addEventListener("click", handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener("click", handleClickOutside);
	});
</script>

<div class="___input">
	<input
		type="text"
		bind:value={input}
		on:input={handleInput}
		on:keydown={handleKeydown}
		on:blur={handleBlur}
		{placeholder}
		autocomplete="off"
	/>
	{#if input.length > 0}
		{#if filteredItems.length > 0}
			<ul>
				{#each filteredItems as item, index}
					<li
						class:selected={index === selectedIndex}
						on:click={() => selectItem(item)}
						on:keypress={() => selectItem(item)}
					>
						{item[value]}
					</li>
				{/each}
			</ul>
		{:else}
			<ul>
				<li class="no-results">{unknown}</li>
			</ul>
		{/if}
	{/if}
</div>

<style>
	.___input {
		position: relative;
		font-family: "Franklin Gothic", "Arial Narrow", Arial, sans-serif;
	}

	ul {
		list-style: none;
		padding: 0;
		margin-top: 0;
		background: white;
		border: 1px solid #ccc;
		border-top: none;
		position: absolute;
		width: 100%;
		max-height: 200px; /* Höhenbegrenzung mit Scrollbar */
		overflow-y: auto; /* Ermöglicht das Scrollen innerhalb der Liste */
	}

	li {
		padding: 8px;
		cursor: pointer;
		border-bottom: 1px solid #eee;
	}

	li:hover {
		background-color: #f7f7f7;
	}

	.selected {
		background-color: #f7f7f7;
	}

	@media (max-width: 600px) {
		li {
			padding: 15px; /* Noch größerer Abstand für kleinere Geräte */
		}
	}
</style>
