<script>
	import { getContext } from "svelte";

	const { xScale, yScale } = getContext("LayerCake");

	$: mobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
			? true
			: false;

	export let r = 5;
	export let annotations = [];

	function lineBreakText(string) {
		let breaks = string.split("<br>");
		return breaks;
	}
</script>

<g class="___anno">
	{#each annotations as annotation, i}
		{#if mobile}
			{#if annotation["mobile"] == true}
				<g class="___anno_{i} {annotation["class"]}">
					<circle
						class="___anno_kreis_{i}"
						cx={$xScale(annotation["xPosition"])}
						cy={$yScale(annotation["yPosition"])}
						{r}
						fill="none"
						stroke="var(--main-text-color)"
						stroke-width="1.5px"
					/>

					{#if annotation["direction"] == "top"}
						{#if lineBreakText(annotation["text"]).length > 1}
							<line
								class="___anno_linie_{i}"
								x1={$xScale(annotation["xPosition"])}
								x2={$xScale(annotation["xPosition"])}
								y1={$yScale(annotation["yPosition"]) -
									annotation["distance"] +
									18}
								y2={$yScale(annotation["yPosition"]) - r}
								stroke="var(--main-text-color)"
								stroke-width="1.5px"
							/>
						{:else}
							<line
								class="___anno_linie_{i}"
								x1={$xScale(annotation["xPosition"])}
								x2={$xScale(annotation["xPosition"])}
								y1={$yScale(annotation["yPosition"]) -
									annotation["distance"]}
								y2={$yScale(annotation["yPosition"]) - r}
								stroke="var(--main-text-color)"
								stroke-width="1.5px"
							/>
						{/if}

						<g
							transform="translate({$xScale(
								annotation['xPosition'])
							},{$yScale(annotation['yPosition']) -
								annotation['distance'] -
								2})"
						>
							<text x="0" y="0" text-anchor="middle">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan
										class="___annotation_background"
										x="0"
										dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan
									>
								{/each}
							</text>
							<text x="0" y="0" text-anchor="middle">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan x="0" dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan
									>
								{/each}
							</text>
						</g>
					{/if}

					{#if annotation["direction"] == "bottom"}
						<line
							class="___anno_linie_{i}"
							x1={$xScale(annotation["xPosition"])}
							x2={$xScale(annotation["xPosition"])}
							y1={$yScale(annotation["yPosition"]) + r}
							y2={$yScale(annotation["yPosition"]) +
								annotation["distance"]}
							stroke="var(--main-text-color)"
							stroke-width="1.5px"
						/>

						<g
							transform="translate({$xScale(
								annotation['xPosition'])
							},{$yScale(annotation['yPosition']) +
								annotation['distance'] +
								12})"
						>
							<text x="0" y="0" text-anchor="middle">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan
										class="___annotation_background"
										x="0"
										dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan
									>
								{/each}
							</text>
							<text x="0" y="0" text-anchor="middle">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan x="0" dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan
									>
								{/each}
							</text>
						</g>
					{/if}

					{#if annotation["direction"] == "left"}
						<line
							class="___anno_linie_{i}"
							x1={$xScale(annotation["xPosition"]) - r}
							x2={$xScale(annotation["xPosition"]) -
								annotation["distance"]}
							y1={$yScale(annotation["yPosition"])}
							y2={$yScale(annotation["yPosition"])}
							stroke="var(--main-text-color)"
							stroke-width="1.5px"
						/>

						<g
							transform="translate({$xScale(
								annotation['xPosition'])
							- annotation['distance']},{$yScale(
								annotation['yPosition']
							) + 4})"
						>
							<text x="0" y="0" text-anchor="end">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan
										class="___annotation_background"
										x="0"
										dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan
									>
								{/each}
							</text>
							<text x="0" y="0" text-anchor="end">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan x="0" dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan
									>
								{/each}
							</text>
						</g>
					{/if}

					{#if annotation["direction"] == "right"}
						<line
							class="___anno_linie_{i}"
							x1={$xScale(annotation["xPosition"]) + r}
							x2={$xScale(annotation["xPosition"]) +
								annotation["distance"]}
							y1={$yScale(annotation["yPosition"])}
							y2={$yScale(annotation["yPosition"])}
							stroke="var(--main-text-color)"
							stroke-width="1.5px"
						/>
						<g
							transform="translate({$xScale(
								annotation['xPosition'])
							+ annotation['distance']},{$yScale(
								annotation['yPosition']
							) + 4})"
						>
							<text x="0" y="0" text-anchor="start">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan
										class="___annotation_background"
										x="0"
										dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan
									>
								{/each}
							</text>
							<text x="0" y="0" text-anchor="start">
								{#each lineBreakText(annotation["text"]) as text, i}
									<tspan x="0" dy={i == 0 ? "0em" : "1em"}
										>{text}</tspan
									>
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
					cx={$xScale(annotation["xPosition"])}
					cy={$yScale(annotation["yPosition"])}
					{r}
					fill="none"
					stroke="var(--main-text-color)"
					stroke-width="1.5px"
				/>

				{#if annotation["direction"] == "top"}
					{#if lineBreakText(annotation["text"]).length > 1}
						<line
							class="___anno_linie_{i}"
							x1={$xScale(annotation["xPosition"])}
							x2={$xScale(annotation["xPosition"])}
							y1={$yScale(annotation["yPosition"]) -
								annotation["distance"] +
								18}
							y2={$yScale(annotation["yPosition"]) - r}
							stroke="var(--main-text-color)"
							stroke-width="1.5px"
						/>
					{:else}
						<line
							class="___anno_linie_{i}"
							x1={$xScale(annotation["xPosition"])}
							x2={$xScale(annotation["xPosition"])}
							y1={$yScale(annotation["yPosition"]) -
								annotation["distance"]}
							y2={$yScale(annotation["yPosition"]) - r}
							stroke="var(--main-text-color)"
							stroke-width="1.5px"
						/>
					{/if}

					<g
						transform="translate({$xScale(
							annotation['xPosition'])
						},{$yScale(annotation['yPosition']) -
							annotation['distance'] -
							2})"
					>
						<text x="0" y="0" text-anchor="middle">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan
									class="___annotation_background"
									x="0"
									dy={i == 0 ? "0em" : "1em"}>{text}</tspan
								>
							{/each}
						</text>
						<text x="0" y="0" text-anchor="middle">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan x="0" dy={i == 0 ? "0em" : "1em"}
									>{text}</tspan
								>
							{/each}
						</text>
					</g>
				{/if}

				{#if annotation["direction"] == "bottom"}
					<line
						class="___anno_linie_{i}"
						x1={$xScale(annotation["xPosition"])}
						x2={$xScale(annotation["xPosition"])}
						y1={$yScale(annotation["yPosition"]) + r}
						y2={$yScale(annotation["yPosition"]) +
							annotation["distance"]}
						stroke="var(--main-text-color)"
						stroke-width="1.5px"
					/>

					<g
						transform="translate({$xScale(
							annotation['xPosition'])
						},{$yScale(annotation['yPosition']) +
							annotation['distance'] +
							12})"
					>
						<text x="0" y="0" text-anchor="middle">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan
									class="___annotation_background"
									x="0"
									dy={i == 0 ? "0em" : "1em"}>{text}</tspan
								>
							{/each}
						</text>
						<text x="0" y="0" text-anchor="middle">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan x="0" dy={i == 0 ? "0em" : "1em"}
									>{text}</tspan
								>
							{/each}
						</text>
					</g>
				{/if}

				{#if annotation["direction"] == "left"}
					<line
						class="___anno_linie_{i}"
						x1={$xScale(annotation["xPosition"]) - r}
						x2={$xScale(annotation["xPosition"]) -
							annotation["distance"]}
						y1={$yScale(annotation["yPosition"])}
						y2={$yScale(annotation["yPosition"])}
						stroke="var(--main-text-color)"
						stroke-width="1.5px"
					/>

					<g
						transform="translate({$xScale(
							annotation['xPosition'])
						- annotation['distance']},{$yScale(
							annotation['yPosition']
						) + 4})"
					>
						<text x="0" y="0" text-anchor="end">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan
									class="___annotation_background"
									x="0"
									dy={i == 0 ? "0em" : "1em"}>{text}</tspan
								>
							{/each}
						</text>
						<text x="0" y="0" text-anchor="end">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan x="0" dy={i == 0 ? "0em" : "1em"}
									>{text}</tspan
								>
							{/each}
						</text>
					</g>
				{/if}

				{#if annotation["direction"] == "right"}
					<line
						class="___anno_linie_{i}"
						x1={$xScale(annotation["xPosition"]) + r}
						x2={$xScale(annotation["xPosition"]) +
							annotation["distance"]}
						y1={$yScale(annotation["yPosition"])}
						y2={$yScale(annotation["yPosition"])}
						stroke="var(--main-text-color)"
						stroke-width="1.5px"
					/>
					<g
						transform="translate({$xScale(
							annotation['xPosition'])
						+ annotation['distance']},{$yScale(
							annotation['yPosition']
						) + 4})"
					>
						<text x="0" y="0" text-anchor="start">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan
									class="___annotation_background"
									x="0"
									dy={i == 0 ? "0em" : "1em"}>{text}</tspan
								>
							{/each}
						</text>
						<text x="0" y="0" text-anchor="start">
							{#each lineBreakText(annotation["text"]) as text, i}
								<tspan x="0" dy={i == 0 ? "0em" : "1em"}
									>{text}</tspan
								>
							{/each}
						</text>
					</g>
				{/if}
			</g>
		{/if}
	{/each}
</g>
