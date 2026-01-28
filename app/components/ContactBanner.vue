<template>
	<section class="contact-banner">
		<div class="content">
			<p class="headline">{{ $t('contactBanner.headline') }}</p>
			<p class="cta"> {{ $t('contactBanner.bookA') }} <a :href="$t('contactBanner.callUrl')">{{ $t('contactBanner.call') }}</a> {{ $t('contactBanner.orDropLine') }} <a
					:href="$t('contactBanner.linkedinUrl')" target="_blank" rel="noopener noreferrer">{{ $t('contactBanner.linkedin') }}</a>
			</p>
		</div>
	</section>
</template>
<style scoped>
.contact-banner {
	background-color: var(--background_inverted);
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 4rem;

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: var(--content_max_width);
		gap: 2rem;
	}

	.headline {
		font: var(--body_text_highlight);
		color: var(--text_inverted);
		margin: 0;
	}

	.cta {
		font: var(--body_text_alt);
		color: var(--text_inverted);
		margin: 0;
		white-space: nowrap;

		a {
			color: var(--text_inverted);
			text-decoration: underline;

			&:hover {
				opacity: 0.8;
			}
		}
	}
}
</style>
