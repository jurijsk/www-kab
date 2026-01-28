<template>
	<section id="hero">
		<h1>{{ $t('hero.title') }}</h1>
		<p>{{ $t('hero.subtitle') }}</p>
		<a :href="heroCtaHref">{{ $t('hero.cta') }}</a>
	</section>
</template>
<script setup>
const heroCtaHref = '#contact';
</script>
<style scoped>
#hero {
	padding: 48px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}

#hero h1 {
	font-size: 3rem;
	line-height: 1.05;
	margin-bottom: 12px
}

#hero p {
	max-width: 720px;
	margin: 0 auto 20px;
	color: rgba(0, 0, 0, 0.7)
}

#hero a {
	display: inline-block;
	padding: 12px 20px;
	border-radius: 8px;
	background: var(--color-accent);
	color: #fff
}

@media (max-width:768px) {
	#hero {
		padding: 32px 0
	}

	#hero h1 {
		font-size: 1.75rem
	}
}
</style>
