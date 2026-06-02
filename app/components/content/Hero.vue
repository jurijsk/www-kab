<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
	headline: { type: String, default: '' },
	subtitle: { type: String, default: '' },
	name: { type: String, default: '' },
	locations: {
		type: Array as PropType<{ kind: 'pin' | 'screen'; label: string; }[]>,
		default: () => [],
	},
});

// Language switch is content-file-per-locale (future); for now English-only.
// Shared via useState so the choice survives SSR→client without a hydration mismatch.
const locale = useState<string>('locale', () => 'en');
const languages = [
	{ code: 'de', label: 'Deutsch' },
	{ code: 'en', label: 'English' },
	{ code: 'da', label: 'Dansk' },
];
</script>
<template>
	<section class="hero">
		<div class="content">
			<div class="text">
				<header>
					<h1 class="headline">{{ headline }} <br /> <span class="subtitle">{{ subtitle }}</span> <br /> {{ name }}</h1>
				</header>
				<div class="meta">
					<nav class="lang_switcher" aria-label="Language switcher">
						<template v-for="(lang, i) in languages" :key="lang.code">
							<a href="#" class="lang" :class="{ 'router-link-exact-active': lang.code === locale }"
								:aria-current="lang.code === locale ? 'true' : undefined"
								@click.prevent="locale = lang.code">{{ lang.label }}</a>
							<span v-if="i < languages.length - 1" class="separator">︱</span>
						</template>
					</nav>
					<div class="locations">
						<span v-for="loc in locations" :key="loc.label" class="location">
							<svg v-if="loc.kind === 'pin'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
								<circle cx="12" cy="10" r="3"></circle>
							</svg>
							<svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
								<line x1="8" y1="21" x2="16" y2="21"></line>
								<line x1="12" y1="17" x2="12" y2="21"></line>
							</svg> {{ loc.label }} </span>
					</div>
				</div>
			</div>
			<div class="photo">
				<img src="/hero-photo.png" alt="" />
			</div>
		</div>
	</section>
</template>
<style scoped>
.hero {

	background: linear-gradient(to right, var(--background_inverted) 50%, var(--alt_background) 50%);
	overflow: hidden;
	position: relative;
	z-index: 0;

	.content {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		min-height: 75vh;
		height: 75vh;



	}

	.text {
		padding-top: 4.8rem;
		border-top: 1px solid var(--decorative_lines_inverted);
		border-bottom: 1px solid var(--decorative_lines_inverted);
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		color: var(--text_inverted);
		padding-bottom: 12rem;
	}

	.headline {
		font: var(--section_title);
		margin: 0;
	}

	.subtitle {
		font: var(--section_title_alt);
		margin: 0;
	}

	.name {
		font: var(--section_title);
		margin: 0;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
		margin-top: auto;
		padding-bottom: 4rem;
	}

	.lang_switcher {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		font: var(--body_text);
		align-items: center;

		.lang {
			color: var(--text_inverted);
			text-decoration: none;
			opacity: 0.7;

			&.router-link-exact-active {
				text-decoration: underline;
				opacity: 1;
			}
		}

		.separator {
			color: var(--text_inverted);
		}
	}

	.locations {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem 0.5rem;
		align-items: center;
	}

	.location {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font: var(--body_text);
		color: var(--text_inverted);


		.icon {
			width: 0.8rem;
			height: 0.8rem;
			flex-shrink: 0;
		}
	}

	.photo {
		position: relative;
		max-width: calc(var(--content_max_width) * 0.45);

		img {
			position: absolute;
			bottom: -7rem;
			left: 50%;
			transform: translateX(calc(-50% - 5rem));
			width: auto;
			height: 120%;
			max-width: none;
		}
	}

	/* Mobile: solid background, single column stacked header → photo → meta.
	   `.text { display: contents }` lifts its header + meta into the flex
	   column so the photo can sit between them without restructuring markup. */
	@container page (max-width: 50rem) {
		/* `.hero` is itself the query container, so it cannot restyle its own
		   background via @container (a container can't query its own size).
		   Mask the desktop gradient with a pseudo element — a descendant the
		   container query can target. */
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: var(--background_inverted);
			z-index: -1;
		}

		.content {
			display: flex;
			flex-direction: column;
			min-height: 100vh;
			height: auto;
			gap: 1.5rem;
		}

		.text {
			display: contents;
		}

		header {
			order: 1;
			padding-top: 1.5rem;
			padding-bottom: 1.5rem;
			border-top: 1px solid var(--decorative_lines_inverted);
			border-bottom: 1px solid var(--decorative_lines_inverted);
		}

		.photo {
			order: 2;
			position: static;
			max-width: none;
			aspect-ratio: 321 / 346;
			background-color: var(--alt_background);
			overflow: hidden;

			img {
				position: static;
				inset: auto;
				transform: none;
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center top;
			}
		}

		.meta {
			order: 3;
			margin-top: auto;
			padding-bottom: 2rem;
		}
	}
}

/* Fallback for browsers without container query support */
@supports not (container-type: inline-size) {
	.hero {
		@media (max-width: 900px) {
			background: var(--background_inverted);

			.content {
				display: flex;
				flex-direction: column;
				min-height: 100vh;
				height: auto;
				gap: 1.5rem;
			}

			.text {
				display: contents;
			}

			header {
				order: 1;
				padding-top: 1.5rem;
				padding-bottom: 1.5rem;
				border-top: 1px solid var(--decorative_lines_inverted);
				border-bottom: 1px solid var(--decorative_lines_inverted);
			}

			.photo {
				order: 2;
				position: static;
				max-width: none;
				aspect-ratio: 321 / 346;
				background-color: var(--alt_background);
				overflow: hidden;

				img {
					position: static;
					inset: auto;
					transform: none;
					width: 100%;
					height: 100%;
					object-fit: cover;
					object-position: center top;
				}
			}

			.meta {
				order: 3;
				margin-top: auto;
				padding-bottom: 2rem;
			}
		}
	}
}
</style>
