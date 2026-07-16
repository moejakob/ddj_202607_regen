import svg from "vite-plugin-svgstring";
import dsv from "@rollup/plugin-dsv";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const config = {
	base: "",
	plugins: [svelte(), dsv(), svg(), cssInjectedByJsPlugin()],
	esbuild: {
		drop: ["console", "debugger"],
	},
	envDir: "envs/",
	build: {
		chunkSizeWarningLimit: 1500,
		rollupOptions: {
			output: {
				dir: "dist/",
				compact: true,
				entryFileNames: "index.js",
				assetFileNames: "index.css",
				chunkFileNames: "chunk.js",
				inlineDynamicImports: true,
				format: "iife",
				globals: {
					d3: "d3",
				},
			},
		},
	},
};

export default config;
