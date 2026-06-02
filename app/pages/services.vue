<script setup lang="ts">
	const { data: services } = await useAsyncData('services_one', () => {
		return queryCollection('services_one').all();
	});
</script>
<template>
	<div v-for="service in services" :key="service.id">
		<ContentRenderer :value="service" />
	</div>
</template>
