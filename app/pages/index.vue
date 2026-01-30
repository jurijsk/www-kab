<script setup lang="ts">
const { locales, setLocale, locale } = useI18n();
</script>
<template>
	<ContactBanner />
	<Hero /> current locale {{ locale }}
	<Header />
	<Footer />
</template>