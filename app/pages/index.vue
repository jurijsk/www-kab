<script setup lang="ts">
const { locales, setLocale, locale } = useI18n();
</script>
<template>
	<ContactBanner />
	<main>
		<Hero /> current locale {{ locale }} 
		<hr> {{ $t('test') }} <!-- Sections from the Figma frame will go here (work, about, contact) -->
		<div class="big_talk">-Hi, Its Karo</div>
	</main>
	<Header />
	<Footer />
</template>