<script setup lang="ts">
import type { PropType } from 'vue';

interface Project { name: string; skills: string[]; description: string; org?: string; }

defineProps({
	heading: { type: String, default: '' },
	skills: { type: Array as PropType<string[]>, default: () => [] },
	notes: {
		type: Array as PropType<{ label: string; paragraphs: string[]; }[]>,
		default: () => [],
	},
	timeline: {
		type: Array as PropType<{ year: string; projects: Project[]; }[]>,
		default: () => [],
	},
});
</script>
<template>
	<section class="experience">
		<div class="content">
			<header class="top">
				<h2 class="heading">{{ heading }}</h2>

				<ul class="skills">
					<li v-for="skill in skills" :key="skill">{{ skill }}</li>
				</ul>

				<div class="notes">
					<div v-for="note in notes" :key="note.label" class="note">
						<p class="sidenote">{{ note.label }}</p>
						<div class="note_text">
							<p v-for="(para, i) in note.paragraphs" :key="i"><span class="dash">— </span>{{ para }}</p>
						</div>
					</div>
				</div>
			</header>

			<div class="timeline">
				<div v-for="group in timeline" :key="group.year" class="year_group">
					<div class="projects">
						<article v-for="proj in group.projects" :key="proj.name" class="project">
							<h3 class="project_name">{{ proj.name }}</h3>
							<ul class="project_skills">
								<li v-for="sk in proj.skills" :key="sk">{{ sk }}</li>
							</ul>
							<p class="project_desc">{{ proj.description }}</p>
							<p v-if="proj.org" class="project_org">{{ proj.org }}</p>
						</article>
					</div>
					<div class="year" aria-hidden="true">{{ group.year }}</div>
				</div>
			</div>
		</div>
	</section>
</template>
<style scoped>
.experience {
	background-color: var(--background);
	padding-top: var(--section_block_spacing);
	padding-bottom: var(--section_block_spacing);

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--section_block_spacing);
	}

	.top {
		display: grid;
		grid-template-columns: 1fr 1fr 2fr;
		gap: var(--text_column_gap);
		align-items: start;
	}

	.heading {
		font: 400 var(--font-size-section-title)/1.2 var(--font_family_main);
		color: var(--direct_speech);
		margin: 0;
		align-self: center;
		text-align: center;
	}

	.skills {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.8rem;

		li {
			font: 800 1.2rem/1 var(--font_family_main);
			color: var(--root_text);
		}
	}

	.notes {
		display: flex;
		flex-direction: column;
		gap: 2.6rem;
	}

	.note {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.sidenote {
		font: var(--aux_text);
		font-family: "Segoe UI", var(--font_family_main);
		text-transform: uppercase;
		color: var(--aux_content);
		margin: 0;
		padding-bottom: 0.4rem;
		border-bottom: 1px solid var(--decorative_lines);
	}

	.note_text {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		p {
			font: var(--small_talk);
			color: var(--direct_speech);
			margin: 0;

			.dash {
				color: var(--direct_speech_alt);
			}
		}
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.year_group {
		display: grid;
		/* fixed year column so the project area is identical width across
		   every group → rows line up across groups too. */
		grid-template-columns: minmax(0, 1fr) 8rem;
		gap: 2rem;
		align-items: center;
	}

	.projects {
		display: flex;
		flex-direction: column;
	}

	.project {
		display: grid;
		/* identical track sizes on every row so columns align across rows:
		   minmax(0, …fr) keeps tracks purely fractional (not content-sized)
		   and the org column is a fixed width. */
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.9fr) minmax(0, 2fr) 9rem;
		gap: 2.5rem;
		align-items: start;
		border: 0.5px solid var(--root_text);
		padding: 1.5rem;
		margin-top: -0.5px;
	}

	.project_name {
		font: 600 1.4rem/1.2 var(--font_family_main);
		color: var(--root_text);
		margin: 0;
	}

	.project_skills {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		li {
			font: var(--body_text);
			color: var(--root_text);

			&::before {
				content: "— ";
				color: var(--secondary_text);
			}
		}
	}

	.project_desc {
		font: var(--body_text);
		color: var(--root_text);
		margin: 0;
	}

	.project_org {
		font: var(--body_text);
		color: var(--aux_content);
		margin: 0;
		white-space: nowrap;
	}

	.year {
		font: 700 6rem/1 var(--font_family_main);
		color: var(--secondary_text);
		opacity: 0.25;
		writing-mode: vertical-rl;
		text-orientation: mixed;
	}

	@container page (max-width: 50rem) {
		.content {
			gap: 4rem;
		}

		.top {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.heading {
			text-align: left;
		}

		.year_group {
			grid-template-columns: 1fr;
		}

		.project {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.year {
			writing-mode: horizontal-tb;
			font-size: 3rem;
			order: -1;
		}
	}
}

@supports not (container-type: inline-size) {
	.experience {
		@media (max-width: 900px) {
			.top {
				grid-template-columns: 1fr;
				gap: 2.5rem;
			}

			.year_group {
				grid-template-columns: 1fr;
			}

			.project {
				grid-template-columns: 1fr;
				gap: 1rem;
			}

			.year {
				writing-mode: horizontal-tb;
				font-size: 3rem;
				order: -1;
			}
		}
	}
}
</style>
