<script setup lang="ts">
	import type { PropType } from 'vue';
	const props = defineProps({
		title: {
			type: String,
			default: '-- not defined --'
		},
		subtitle: {
			type: String,
			default: '-- not defined --'
		},
		highlights: {
			type: Object as PropType<{ highlight: string, text: string; }[]>,
			required: true,
		},
	});
</script>
<template>
	<h3> {{ title }} </h3>
	<p> {{ subtitle }}</p>
	<div>
		<p v-for="highlight in highlights" :key="highlight.highlight">
			<em> {{ highlight.highlight }}: </em> {{ highlight.text }}
			<slot name="text" />
		</p>
	</div>
</template>
<style scoped>
	p {
		em {
			font-weight: 800;
			font-style: normal;
			color: var(--service_text_highlight);
		}
		
	}
</style>