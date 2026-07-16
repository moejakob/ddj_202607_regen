import { writable } from "svelte/store";

const registry = writable(new Map());

export default registry;

export function register(module) {
	const component = module.default || module;
	registry.update((current) => current.set(component.name, component));
}
