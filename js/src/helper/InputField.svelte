<script context="module">
	import { register } from "./registry.js";
	import("./InputField.svelte").then(register);
</script>

<script>
	export let value = "";
	export let handleClick = () => {
		console.log("Enter gedrückt");
	};
	export let valid = "___input";

	let focused;

	$: klasse = focused ? valid + " ___input_focus " : valid;
</script>

<input
	class={klasse}
	type="text"
	placeholder="Tippen Sie ein Jahr, z.B. 1994"
	bind:value
	on:focus={() => {
		focused = true;
		value = "";
	}}
	on:change={handleClick} />

<style>
	.___input_focus {
		box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.26);
	}

	/* .pulsate {
		-webkit-animation: pulsate 1s infinite alternate;
		-moz-animation: pulsate 1s infinite alternate;
		-animation: pulsate 1s infinite alternate;
		animation: pulsate 1s infinite alternate;
	} */

	@-webkit-keyframes pulsate {
		from {
			box-shadow: 0 0 0 #dbdbdb;
		}

		to {
			box-shadow: 0 0 25px #006ab2;
		}
	}

	@-moz-keyframes pulsate {
		from {
			box-shadow: 0 0 0 #dbdbdb;
		}

		to {
			box-shadow: 0 0 25px #006ab2;
		}
	}

	@keyframes pulsate {
		from {
			box-shadow: 0 0 0 #dbdbdb;
		}

		to {
			box-shadow: 0 0 25px #006ab2;
		}
	}
</style>
