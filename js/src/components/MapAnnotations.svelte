<script>
	import { getContext } from "svelte";

	const { data, width, height } = getContext("LayerCake");

	$: mobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
			? true
			: true;

	// export let parseTime;
	export let annotations = [];
	export let projection;
	export let r = 5;
	// export let fill = 'yellow';

	function lineBreakText(string) {
		let breaks = string.split("<br>");
		return breaks;
	}

	$: projectionFn = projection().fitSize([$width, $height], $data);
</script>

<g class="___anno">
	{#each annotations as annotation, i}
		{#if mobile}
			{#if annotation["mobile"] == true}
				<g class="___anno_{i} {annotation["class"]}">
					<circle
						class="___anno_kreis_{i}"
						cx={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[0]}
						cy={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[1]}
						{r}
						fill="hotpink"
						stroke="var(--main-text-color)"
						stroke-width="1.5px" />

					{#if annotation["direction"] == "top"}
						{#if lineBreakText(annotation["text"]).length > 1}
							<line
								class="___anno_linie_{i}"
								x1={projectionFn([
									annotation["xPosition"],
									annotation["yPosition"],
								])[0]}
								x2={projectionFn([
									annotation["xPosition"],
									annotation["yPosition"],
								])[0]}
								y1={projectionFn([
									annotation["xPosition"],
									annotation["yPosition"],
								])[1] - annotation["distance"]}
								y2={projectionFn([
									annotation["xPosition"],
									annotation["yPosition"],
								])[1] - r}
								stroke="var(--main-text-color)"
								stroke-width="1.5px" />
						{:else}
							<line
								class="___anno_linie_{i}"
								x1={projectionFn([
									annotation["xPosition"],
									annotation["yPosition"],
								])[0]}
								x2={projectionFn([
									annotation["xPosition"],
									annotation["yPosition"],
								])[0]}
								y1={projectionFn([
									annotation["xPosition"],
									annotation["yPosition"],
								])[1] - annotation["distance"]}
								y2={projectionFn([
									annotation["xPosition"],
									annotation["yPosition"],
								])[1] - r}
								stroke="var(--main-text-color)"
								stroke-width="1.5px" />
						{/if}

						<g
							transform="translate({projectionFn([
								annotation['xPosition'],
								annotation['yPosition'],
							])[0]},{projectionFn([
								annotation['xPosition'],
								annotation['yPosition'],
							])[1] -
								annotation['distance'] -
								2})">
							<text x="0" y="0" text-anchor="middle">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan
										class="___annotation_background"
										x="0"
										dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan>
								{/each}
							</text>
							<text x="0" y="0" text-anchor="middle">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan x="0" dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan>
								{/each}
							</text>
						</g>
					{/if}

					{#if annotation["direction"] == "bottom"}
						<line
							class="___anno_linie_{i}"
							x1={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[0]}
							x2={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[0]}
							y1={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[1] + r}
							y2={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[1] + annotation["distance"]}
							stroke="var(--main-text-color)"
							stroke-width="1.5px" />

						<g
							transform="translate({projectionFn([
								annotation['xPosition'],
								annotation['yPosition'],
							])[0]},{projectionFn([
								annotation['xPosition'],
								annotation['yPosition'],
							])[1] +
								annotation['distance'] +
								12})">
							<text x="0" y="0" text-anchor="middle">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan
										class="___annotation_background"
										x="0"
										dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan>
								{/each}
							</text>
							<text x="0" y="0" text-anchor="middle">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan x="0" dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan>
								{/each}
							</text>
						</g>
					{/if}

					{#if annotation["direction"] == "left"}
						<line
							class="___anno_linie_{i}"
							x1={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[0] - r}
							x2={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[0] - annotation["distance"]}
							y1={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[1]}
							y2={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[1]}
							stroke="var(--main-text-color)"
							stroke-width="1.5px" />

						<g
							transform="translate({projectionFn([
								annotation['xPosition'],
								annotation['yPosition'],
							])[0] - annotation['distance']},{projectionFn([
								annotation['xPosition'],
								annotation['yPosition'],
							])[1] + 4})">
							<text x="0" y="0" text-anchor="end">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan
										class="___annotation_background"
										x="0"
										dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan>
								{/each}
							</text>
							<text x="0" y="0" text-anchor="end">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan x="0" dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan>
								{/each}
							</text>
						</g>
					{/if}

					{#if annotation["direction"] == "right"}
						<line
							class="___anno_linie_{i}"
							x1={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[0] + r}
							x2={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[0] + annotation["distance"]}
							y1={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[1]}
							y2={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[1]}
							stroke="var(--main-text-color)"
							stroke-width="1.5px" />
						<g
							transform="translate({projectionFn([
								annotation['xPosition'],
								annotation['yPosition'],
							])[0] + annotation['distance']},{projectionFn([
								annotation['xPosition'],
								annotation['yPosition'],
							])[1] + 4})">
							<text x="0" y="0" text-anchor="start">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan
										class="___annotation_background"
										x="0"
										dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan>
								{/each}
							</text>
							<text x="0" y="0" text-anchor="start">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan x="0" dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan>
								{/each}
							</text>
						</g>
					{/if}
				</g>
			{/if}
		{:else if annotation["desktop"] == true}
			<g class="___anno_{i} {annotation["class"]}">
				<circle
					class="___anno_kreis_{i}"
					cx={projectionFn([
						annotation["xPosition"],
						annotation["yPosition"],
					])[0]}
					cy={projectionFn([
						annotation["xPosition"],
						annotation["yPosition"],
					])[1]}
					{r}
					fill="none"
					stroke="var(--main-text-color)"
					stroke-width="1.5px" />

				{#if annotation["direction"] == "top"}
					{#if lineBreakText(annotation["text"]).length > 1}
						<line
							class="___anno_linie_{i}"
							x1={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[0]}
							x2={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[0]}
							y1={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[1] -
								annotation["distance"] +
								18}
							y2={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[1] - r}
							stroke="var(--main-text-color)"
							stroke-width="1.5px" />
					{:else}
						<line
							class="___anno_linie_{i}"
							x1={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[0]}
							x2={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[0]}
							y1={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[1] - annotation["distance"]}
							y2={projectionFn([
								annotation["xPosition"],
								annotation["yPosition"],
							])[1] - r}
							stroke="var(--main-text-color)"
							stroke-width="1.5px" />
					{/if}

					<g
						transform="translate({projectionFn([
							annotation['xPosition'],
							annotation['yPosition'],
						])[0]},{projectionFn([
							annotation['xPosition'],
							annotation['yPosition'],
						])[1] -
							annotation['distance'] -
							2})">
						<text x="0" y="0" text-anchor="middle">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan
									class="___annotation_background"
									x="0"
									dy={i == 0 ? "0em" : "1em"}>{text}</tspan>
							{/each}
						</text>
						<text x="0" y="0" text-anchor="middle">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan x="0" dy={i == 0 ? "0em" : "1em"}
									>{text}</tspan>
							{/each}
						</text>
					</g>
				{/if}

				{#if annotation["direction"] == "bottom"}
					<line
						class="___anno_linie_{i}"
						x1={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[0]}
						x2={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[0]}
						y1={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[1] + r}
						y2={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[1] + annotation["distance"]}
						stroke="var(--main-text-color)"
						stroke-width="1.5px" />

					<g
						transform="translate({projectionFn([
							annotation['xPosition'],
							annotation['yPosition'],
						])[0]},{projectionFn([
							annotation['xPosition'],
							annotation['yPosition'],
						])[1] +
							annotation['distance'] +
							12})">
						<text x="0" y="0" text-anchor="middle">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan
									class="___annotation_background"
									x="0"
									dy={i == 0 ? "0em" : "1em"}>{text}</tspan>
							{/each}
						</text>
						<text x="0" y="0" text-anchor="middle">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan x="0" dy={i == 0 ? "0em" : "1em"}
									>{text}</tspan>
							{/each}
						</text>
					</g>
				{/if}

				{#if annotation["direction"] == "left"}
					<line
						class="___anno_linie_{i}"
						x1={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[0] - r}
						x2={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[0] - annotation["distance"]}
						y1={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[1]}
						y2={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[1]}
						stroke="var(--main-text-color)"
						stroke-width="1.5px" />

					<g
						transform="translate({projectionFn([
							annotation['xPosition'],
							annotation['yPosition'],
						])[0] - annotation['distance']},{projectionFn([
							annotation['xPosition'],
							annotation['yPosition'],
						])[1] + 4})">
						<text x="0" y="0" text-anchor="end">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan
									class="___annotation_background"
									x="0"
									dy={i == 0 ? "0em" : "1em"}>{text}</tspan>
							{/each}
						</text>
						<text x="0" y="0" text-anchor="end">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan x="0" dy={i == 0 ? "0em" : "1em"}
									>{text}</tspan>
							{/each}
						</text>
					</g>
				{/if}

				{#if annotation["direction"] == "right"}
					<line
						class="___anno_linie_{i}"
						x1={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[0] + r}
						x2={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[0] + annotation["distance"]}
						y1={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[1]}
						y2={projectionFn([
							annotation["xPosition"],
							annotation["yPosition"],
						])[1]}
						stroke="var(--main-text-color)"
						stroke-width="1.5px" />
					<g
						transform="translate({projectionFn([
							annotation['xPosition'],
							annotation['yPosition'],
						])[0] + annotation['distance']},{projectionFn([
							annotation['xPosition'],
							annotation['yPosition'],
						])[1] + 4})">
						<text x="0" y="0" text-anchor="start">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan
									class="___annotation_background"
									x="0"
									dy={i == 0 ? "0em" : "1em"}>{text}</tspan>
							{/each}
						</text>
						<text x="0" y="0" text-anchor="start">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan x="0" dy={i == 0 ? "0em" : "1em"}
									>{text}</tspan>
							{/each}
						</text>
					</g>
				{/if}
			</g>
		{/if}
	{/each}
</g>
