<template>
	<section class="hero">
		<div class="content">
			<div class="text">
				<header>
					<h1 class="headline">{{ $t('hero.headline') }}</h1>
					<p class="subtitle">{{ $t('hero.subtitle') }}</p>
					<p class="name">{{ $t('hero.name') }}</p>
				</header>
				<div class="meta">
					<nav class="lang-switcher" aria-label="Language switcher">
						<NuxtLink :to="$switchLocalePath('de')" class="lang">Deutsch</NuxtLink>
						<span class="separator">︱</span>
						<NuxtLink :to="$switchLocalePath('en')" class="lang">English</NuxtLink>
						<span class="separator">︱</span>
						<NuxtLink :to="$switchLocalePath('da')" class="lang">Dansk</NuxtLink>
					</nav>
					<div class="locations">
						<span class="location">
							<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
								<circle cx="12" cy="10" r="3"></circle>
							</svg> {{ $t('hero.locations.munster') }} </span>
						<span class="location">
							<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
								<circle cx="12" cy="10" r="3"></circle>
							</svg> {{ $t('hero.locations.berlin') }} </span>
						<span class="location">
							<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
								<line x1="8" y1="21" x2="16" y2="21"></line>
								<line x1="12" y1="17" x2="12" y2="21"></line>
							</svg> {{ $t('hero.locations.remote') }} </span>
					</div>
				</div>
			</div>
		</div>
		<div class="photo">
			<img src="/hero-photo.png" alt="" />
		</div>
	</section>
</template>
<style scoped>
.hero {
	display: grid;
	padding: 0;
	grid-template-columns: 1.2fr 1fr;
	min-height: var(--section_min_height);
	background-color: var(--background_inverted);

	.content {
		display: flex;
		flex-direction: column;
		padding-left: var(--page_side_spacing);
		padding-bottom: 6rem;
	}

	.text {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-right: var(--page_side_spacing);
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
		font: var(--subsection_title);
		font-weight: 300;
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

	.lang-switcher {
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
		background-color: var(--alt_background);
		position: relative;
		overflow: hidden;

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

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;

		.content {
			order: 2;
			padding: 2rem var(--page_side_spacing);
		}

		.text {
			padding-top: 2rem;
			border-top: none;
		}

		header {
			padding-bottom: 4rem;
		}

		.photo {
			order: 1;
			min-height: 20rem;

			img {
				bottom: auto;
				top: 0;
				height: 100%;
			}
		}
	}
}
</style>
