<script setup lang="ts">
defineProps({
	headline: { type: String, default: '' },
	bookA: { type: String, default: '' },
	call: { type: String, default: '' },
	orDropLine: { type: String, default: '' },
	linkedin: { type: String, default: '' },
	callUrl: { type: String, default: '#' },
	linkedinUrl: { type: String, default: '#' },
});
</script>
<template>
	<section class="contact_banner">
		<div class="content">
			<p class="headline">{{ headline }}</p>
			<p class="cta"> {{ bookA }} <a :href="callUrl">{{ call }}</a> {{ orDropLine }} <a
					:href="linkedinUrl" target="_blank" rel="noopener noreferrer">{{ linkedin }}</a>
			</p>
		</div>
	</section>
</template>
<style scoped>
.contact_banner {
	background-color: var(--background_inverted);
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 4rem;

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
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

	/* Mobile: drop the headline, center the CTA on a single line. */
	@container page (max-width: 50rem) {
		.content {
			justify-content: center;
		}

		.headline {
			display: none;
		}

		.cta {
			white-space: normal;
			text-align: center;
		}
	}
}

/* Fallback for browsers without container query support */
@supports not (container-type: inline-size) {
	.contact_banner {
		@media (max-width: 900px) {
			.content {
				justify-content: center;
			}

			.headline {
				display: none;
			}

			.cta {
				white-space: normal;
				text-align: center;
			}
		}
	}
}
</style>
