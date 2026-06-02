<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
	title: { type: String, default: '' },
	subtitle: { type: String, default: '' },
	highlights: {
		type: Array as PropType<{ highlight: string; text: string; }[]>,
		default: () => [],
	},
});
</script>
<template>
	<article class="service_card">
		<div class="package_title">
			<p class="title">{{ title }}</p>
			<p class="subtitle">{{ subtitle }}</p>
		</div>
		<div class="description">
			<p v-for="item in highlights" :key="item.highlight">
				<em>{{ item.highlight }}:</em> {{ item.text }}
			</p>
		</div>
	</article>
</template>
<style scoped>
.service_card {
	display: flex;
	flex-direction: column;
	gap: 2.6rem;

	.package_title {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.title {
		font: 600 1.2rem/1.2 var(--font_family_main);
		color: var(--root_text);
		margin: 0;
	}

	.subtitle {
		font: 400 0.85rem/1.3 var(--font_family_main);
		color: var(--direct_speech);
		margin: 0;
	}

	.description {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		p {
			font: var(--body_text);
			color: var(--root_text);
			margin: 0;

			em {
				font-weight: 700;
				font-style: normal;
				color: var(--service_text_highlight);
			}
		}
	}
}
</style>
