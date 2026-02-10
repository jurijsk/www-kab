<script setup lang="ts">
	const { locale } = useI18n();

	const { data: services } = await useAsyncData('services_one', () => {
		return queryCollection('services_one').all();
	});

	//const localized = computed(() => services.value?.map(services => services[locale.value]));

</script>
<template>
	<div v-for="service in services" :key="service.id"> 
		<ContentRenderer :value="service" />
	</div>
</template>