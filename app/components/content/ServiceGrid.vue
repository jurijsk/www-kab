<script setup lang="ts">
import type { PropType } from 'vue';

interface Card { title: string; subtitle: string; highlights: { highlight: string; text: string; }[]; }

defineProps({
	label: { type: String, default: 'services' },
	intro: { type: String, default: '' },
	headlineLead: { type: String, default: '' },
	headlineAccent: { type: String, default: '' },
	pillars: {
		type: Array as PropType<{ heading: string; cards: Card[]; }[]>,
		default: () => [],
	},
});
</script>
<template>
	<section class="service_grid">
		<div class="content">
			<div class="grid">
				<!-- header row -->
				<div class="cell center">
					<p class="label">{{ label }}</p>
				</div>
				<div class="cell">
					<p class="intro"><span class="dash">— </span>{{ intro }}</p>
				</div>
				<div class="cell center">
					<p class="headline">
						<span class="lead">{{ headlineLead }}</span>
						<span class="accent">{{ headlineAccent }}</span>
					</p>
				</div>

				<!-- one row per pillar: heading | card | card -->
				<template v-for="pillar in pillars" :key="pillar.heading">
					<div class="cell center">
						<h2 class="pillar_heading">{{ pillar.heading }}</h2>
					</div>
					<div v-for="card in pillar.cards" :key="card.title" class="cell card_cell">
						<ServiceCard v-bind="card" />
					</div>
				</template>
			</div>
		</div>
	</section>
</template>
<style scoped>
.service_grid {
	background-color: var(--background);
	padding-top: var(--section_block_spacing);
	padding-bottom: var(--section_block_spacing);

	.grid {
		--line: color-mix(in srgb, var(--decorative_lines) 22%, white);
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1px;
		background-color: var(--line);
		border: 1px solid var(--line);
	}

	.cell {
		background-color: var(--background);
		display: flex;
		flex-direction: column;
		padding: clamp(1.5rem, 2.4vw, 3rem);
		min-height: 14rem;
	}

	.cell.center {
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.card_cell {
		justify-content: flex-start;
		min-height: 22rem;
	}

	.label {
		font: var(--body_text);
		color: var(--direct_speech);
		margin: 0;
	}

	.intro {
		font: var(--small_talk);
		color: var(--direct_speech);
		margin: 0;

		.dash {
			color: var(--direct_speech_alt);
		}
	}

	.headline {
		margin: 0;
		text-transform: uppercase;
		color: var(--root_text);

		.lead {
			display: block;
			font: 300 clamp(1.5rem, 3.2vw, 2.8rem)/1.05 var(--font_family_main);
		}

		.accent {
			display: block;
			font: 800 clamp(2rem, 4.2vw, 3.6rem)/1 var(--font_family_main);
		}
	}

	.pillar_heading {
		font: 400 var(--font-size-section-title)/1.15 var(--font_family_main);
		color: var(--direct_speech);
		margin: 0;
	}

	@container page (max-width: 50rem) {
		.grid {
			grid-template-columns: 1fr;
		}

		.cell {
			min-height: 0;
			text-align: left;
			align-items: stretch;
		}

		.cell.center {
			align-items: flex-start;
			text-align: left;
		}

		.card_cell {
			min-height: 0;
		}
	}
}

@supports not (container-type: inline-size) {
	.service_grid {
		@media (max-width: 900px) {
			.grid {
				grid-template-columns: 1fr;
			}

			.cell {
				min-height: 0;
				text-align: left;
				align-items: stretch;
			}

			.cell.center {
				align-items: flex-start;
				text-align: left;
			}

			.card_cell {
				min-height: 0;
			}
		}
	}
}
</style>
