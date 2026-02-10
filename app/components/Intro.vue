<template>
	<section class="intro">
		<div class="content">
			<div class="greeting">
				<p class="big_talk">
					<span class="dash">— </span>
					<span>{{ $t('intro.greeting') }}</span>
				</p>
			</div>
			<div class="small_talk">
				<p v-for="(paragraph, index) in $t('intro.description').split('\n\n')" :key="index"> {{ paragraph }} </p>
			</div>
		</div>
	</section>
</template>
<style scoped>
	.intro {
		background-color: var(--background);
		padding-top: var(--section_block_spacing);
		padding-bottom: var(--section_block_spacing);

		.content {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: var(--text_column_gap);
			align-items: center;
		}

		.greeting {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.big_talk {
			font: var(--big_talk);
			color: var(--direct_speech);
			margin: 0;
			display: flex;
			gap: 0.3em;

			.dash {
				flex-shrink: 0;
			}
		}

		.description {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.small_talk {
			font: var(--small_talk);
			color: var(--direct_speech);
			margin: 0;
		}

		@container page (max-width: 50rem) {
			.content {
				grid-template-columns: 1fr;
				gap: 2rem;
			}

			.greeting {
				order: 1;
			}

			.description {
				order: 2;
			}
		}
	}

	@supports not (container-type: inline-size) {
		.intro {
			@media (max-width: 900px) {
				.content {
					grid-template-columns: 1fr;
					gap: 2rem;
				}

				.greeting {
					order: 1;
				}

				.description {
					order: 2;
				}
			}
		}
	}
</style>
