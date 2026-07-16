<script>
	import InputField from "../components/InputField.svelte";

	let items = [
		{ gkz: "08335", ort: "Konstanz" },
		{ gkz: "08335", ort: "Konstanz" },
		{ gkz: "08335", ort: "Konstanz" },
		{ gkz: "08335", ort: "Konstanz" },
		{ gkz: "08335", ort: "Konstanz" },
		{ gkz: "08327", ort: "Bodenseekreis" },
		{ gkz: "08111", ort: "Stuttgart" },
	];

	function handleSelect(key) {
		console.log("Selected key:", key.detail);
	}
</script>

<InputField {items} on:select={handleSelect} key="gkz" value="ort" />
