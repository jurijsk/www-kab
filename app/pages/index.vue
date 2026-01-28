<script setup lang="ts">
const { locales, setLocale, locale } = useI18n();
</script>
<template>
	<ContactBanner />
	<Header />
	<main>
		<Hero /> current locale {{ locale }} <NuxtLink :to="$switchLocalePath('de')">Deusch</NuxtLink>
		<NuxtLink :to="$switchLocalePath('en')">English</NuxtLink>
		<NuxtLink :to="$switchLocalePath('da')">Dansk</NuxtLink>
		<hr> {{ $t('test') }} <!-- Sections from the Figma frame will go here (work, about, contact) -->
		<div class="big_talk">-Hi, Its Karo</div>
	</main>
	<Footer />
</template>