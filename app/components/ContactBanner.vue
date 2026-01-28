<template>
	<section class="contact_banner">
		<div class="contact_banner__content">
			<p class="contact_banner__headline">{{ $t('contactBanner.headline') }}</p>
			<p class="contact_banner__cta"> {{ $t('contactBanner.bookA') }} <a :href="$t('contactBanner.callUrl')" class="contact_banner__link">{{ $t('contactBanner.call') }}</a> {{
				$t('contactBanner.orDropLine') }} <a :href="$t('contactBanner.linkedinUrl')" class="contact_banner__link" target="_blank" rel="noopener noreferrer">{{ $t('contactBanner.linkedin')
					}}</a>
			</p>
		</div>
	</section>
</template>
<style scoped>
.contact_banner {
	background-color: var(--background_inverted);
	padding: 0 var(--page_side_spacing);
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 4rem;
}

.contact_banner__content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	max-width: var(--content_max_width);
	gap: 2rem;
}

.contact_banner__headline {
	font: var(--body_text_highlight);
	color: var(--body_text_inverted);
	margin: 0;
}

.contact_banner__cta {
	font: var(--body_text_alt);
	color: var(--body_text_inverted);
	margin: 0;
	white-space: nowrap;
}

.contact_banner__link {
	color: var(--body_text_inverted);
	text-decoration: underline;
}

.contact_banner__link:hover {
	opacity: 0.8;
}
</style>
