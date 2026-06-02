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
			<header class="intro_row">
				<p class="label">{{ label }}</p>
				<p class="blurb"><span class="dash">— </span>{{ intro }}</p>
				<p class="headline">{{ headlineLead }} <span class="accent">{{ headlineAccent }}</span></p>
			</header>

			<div v-for="pillar in pillars" :key="pillar.heading" class="pillar">
				<h2 class="pillar_heading">{{ pillar.heading }}</h2>
				<div class="cards">
					<ServiceCard v-for="card in pillar.cards" :key="card.title" v-bind="card" />
				</div>
			</div>
		</div>
	</section>
</template>
<style scoped>
.service_grid {
	background-color: var(--background);
	padding-top: var(--section_block_spacing);
	padding-bottom: var(--section_block_spacing);

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--section_block_spacing);
	}

	.intro_row {
		display: grid;
		grid-template-columns: 1fr 1.4fr 1fr;
		gap: var(--text_column_gap);
		align-items: center;
		border-top: 1px solid var(--decorative_lines);
		border-bottom: 1px solid var(--decorative_lines);
		padding-block: 4.4rem;
		margin: 0;
	}

	.label {
		font: var(--body_text);
		color: var(--direct_speech);
		text-align: center;
		margin: 0;
	}

	.blurb {
		font: var(--small_talk);
		color: var(--direct_speech);
		margin: 0;

		.dash {
			color: var(--direct_speech_alt);
		}
	}

	.headline {
		font: 300 var(--font-size-section-title)/1.1 var(--font_family_main);
		color: var(--root_text);
		text-align: right;
		margin: 0;

		.accent {
			display: block;
			font-weight: 800;
			text-transform: uppercase;
			letter-spacing: 0.02em;
		}
	}

	.pillar {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.pillar_heading {
		font: 400 var(--font-size-section-title)/1.1 var(--font_family_main);
		color: var(--direct_speech);
		margin: 0;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: var(--text_column_gap);
	}

	@container page (max-width: 50rem) {
		.content {
			gap: 4rem;
		}

		.intro_row {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding-block: 2rem;
			text-align: left;
		}

		.label,
		.headline {
			text-align: left;
		}

		.pillar {
			gap: 1.5rem;
		}

		.cards {
			grid-template-columns: 1fr;
		}
	}
}

@supports not (container-type: inline-size) {
	.service_grid {
		@media (max-width: 900px) {
			.intro_row {
				grid-template-columns: 1fr;
				gap: 2rem;
				padding-block: 2rem;
			}

			.label,
			.headline {
				text-align: left;
			}

			.cards {
				grid-template-columns: 1fr;
			}
		}
	}
}
</style>
