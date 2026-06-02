<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
	heading: { type: String, default: 'Contact details' },
	intro: { type: String, default: '' },
	name: { type: String, default: '' },
	roles: { type: Array as PropType<string[]>, default: () => [] },
	email: { type: String, default: '' },
	phones: { type: Array as PropType<string[]>, default: () => [] },
	linkedinUrl: { type: String, default: '' },
	copyright: { type: String, default: '' },
});
</script>
<template>
	<section class="contact">
		<div class="content">
			<p class="section_title">{{ heading }}</p>

			<div class="grid">
				<p class="intro"><span class="dash">— </span>{{ intro }}</p>

				<div class="details">
					<p class="name">{{ name }}</p>
					<p v-for="role in roles" :key="role" class="role">{{ role }}</p>

					<a v-if="email" class="email" :href="`mailto:${email}`">{{ email }}</a>

					<div class="phones">
						<p v-for="phone in phones" :key="phone">{{ phone }}</p>
					</div>

					<a v-if="linkedinUrl" class="linkedin" :href="linkedinUrl" target="_blank" rel="noopener noreferrer">LinkedIn</a>
				</div>
			</div>

			<footer class="colophon">
				<p class="copyright">{{ copyright }}</p>
			</footer>
		</div>
	</section>
</template>
<style scoped>
.contact {
	background-color: var(--background_inverted);
	color: var(--text_inverted);
	padding-bottom: 2rem;

	.content {
		display: flex;
		flex-direction: column;
		gap: 3.5rem;
	}

	.section_title {
		font: 400 var(--font-size-section-title)/1.1 var(--font_family_main);
		text-align: center;
		margin: 0;
		padding-block: 2.4rem;
		border-top: 1px solid var(--decorative_lines_inverted);
		border-bottom: 1px solid var(--decorative_lines_inverted);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--text_column_gap);
		align-items: center;
		max-width: 75rem;
	}

	.intro {
		font: var(--small_talk);
		margin: 0;

		.dash {
			color: var(--text_inverted);
		}
	}

	.details {
		display: flex;
		flex-direction: column;

		.name {
			font: var(--body_text_highlight);
			margin: 0;
		}

		.role {
			font: var(--body_text);
			margin: 0;
		}

		.email {
			font: 700 var(----type_ramp_lx)/1.3 var(--font_family_main);
			color: var(--text_inverted);
			text-decoration: underline;
			margin-block: 1.8rem;
		}

		.phones {
			display: flex;
			flex-direction: column;
			gap: 0.6rem;
			margin-bottom: 1.4rem;

			p {
				font: 700 var(----type_ramp_lx)/1.3 var(--font_family_main);
				margin: 0;
			}
		}

		.linkedin {
			font: 700 var(--font-size-section-title)/1.2 var(--font_family_main);
			color: var(--text_inverted);
			text-decoration: underline;
			align-self: flex-start;
		}
	}

	.colophon {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		border-top: 1px solid var(--decorative_lines_inverted);
		padding-top: 0.8rem;

		.copyright {
			font: var(--aux_text);
			text-align: right;
			margin: 0;
		}
	}

	@container page (max-width: 50rem) {
		.grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
			align-items: start;
		}
	}
}

@supports not (container-type: inline-size) {
	.contact {
		@media (max-width: 900px) {
			.grid {
				grid-template-columns: 1fr;
				gap: 2.5rem;
				align-items: start;
			}
		}
	}
}
</style>
