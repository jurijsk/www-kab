<template>
	<header>
		<nav>
			<div class="brand">{{ $t('site.name') }}</div>
			<ul>
				<li><a href="#work">{{ $t('nav.work') }}</a></li>
				<li><a href="#about">{{ $t('nav.about') }}</a></li>
				<li><a href="#contact">{{ $t('nav.contact') }}</a></li>
			</ul>
		</nav>
	</header>
</template>
<script setup>
// Header is structural only — styling comes from component-scoped CSS later.
</script>
<!-- keep styles empty for now; will add after design tokens confirmed -->
<style scoped>
header {
	border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	background: transparent;
}

nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 0
}

.brand {
	font-weight: 700;
	font-size: 1rem
}

nav ul {
	margin: 0;
	padding: 0;
	display: flex;
	gap: 16px
}

nav a {
	padding: 8px 12px;
	border-radius: 6px
}

nav a:hover {
	background: rgba(0, 0, 0, 0.03)
}

@container page (max-width: 50rem) {
	nav ul {
		gap: 8px
	}
}

/* Fallback for browsers without container query support */
@supports not (container-type: inline-size) {
	@media (max-width: 768px) {
		nav ul {
			gap: 8px
		}
	}
}
</style>
