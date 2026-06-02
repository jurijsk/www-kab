<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
	label: { type: String, default: 'Testimonials' },
	quotes: {
		type: Array as PropType<{ quote: string; name: string; role: string; linkedin?: string; }[]>,
		default: () => [],
	},
});

const root = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
const current = ref(0);
const inView = ref(false);
let observer: IntersectionObserver | null = null;

function goTo(index: number) {
	const t = track.value;
	if (!t) return;
	const clamped = Math.max(0, Math.min(index, props.quotes.length - 1));
	const card = t.children[clamped] as HTMLElement | undefined;
	card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
	current.value = clamped;
}

function onScroll() {
	const t = track.value;
	if (!t) return;
	let nearest = 0;
	let min = Infinity;
	Array.from(t.children).forEach((child, i) => {
		const distance = Math.abs((child as HTMLElement).offsetLeft - t.scrollLeft);
		if (distance < min) { min = distance; nearest = i; }
	});
	current.value = nearest;
}

// Arrow keys navigate the carousel while the section is on screen — no need to
// focus it first. Ignored while typing in a form field.
function onKeydown(event: KeyboardEvent) {
	if (!inView.value) return;
	const tag = (event.target as HTMLElement | null)?.tagName;
	if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
	if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current.value + 1); }
	else if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current.value - 1); }
	else if (event.key === 'Home') { event.preventDefault(); goTo(0); }
	else if (event.key === 'End') { event.preventDefault(); goTo(props.quotes.length - 1); }
}

onMounted(() => {
	window.addEventListener('keydown', onKeydown);
	observer = new IntersectionObserver(
		([entry]) => { inView.value = entry.isIntersecting; },
		{ threshold: 0.5 },
	);
	if (root.value) observer.observe(root.value);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', onKeydown);
	observer?.disconnect();
});
</script>
<template>
	<section ref="root" class="testimonials">
		<div class="content">
			<p class="label">{{ label }}</p>

			<div class="carousel" role="region" aria-roledescription="carousel" :aria-label="label" tabindex="0">
				<ul ref="track" class="track" @scroll.passive="onScroll">
					<li v-for="(q, i) in quotes" :key="i" class="quote" role="group" aria-roledescription="slide" :aria-label="`${i + 1} of ${quotes.length}`" :aria-hidden="i === current ? undefined : 'true'" @click="goTo(i)">
						<span class="mark" aria-hidden="true">&ldquo;</span>
						<blockquote class="text">{{ q.quote }}</blockquote>
						<footer class="author">
							<span class="name">
								{{ q.name }}
								<a v-if="q.linkedin" :href="q.linkedin" target="_blank" rel="noopener noreferrer" class="linkedin" :aria-label="`${q.name} on LinkedIn`" @click.stop>
									<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17V10.5H6.27V17h2.07zM7.3 9.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zM18 17v-3.57c0-1.9-.4-3.36-2.63-3.36-1.07 0-1.79.59-2.08 1.15h-.03V10.5h-2v6.5h2.07v-3.22c0-.85.16-1.67 1.21-1.67 1.04 0 1.06.97 1.06 1.72V17H18z" /></svg>
								</a>
							</span>
							<span class="role">{{ q.role }}</span>
						</footer>
					</li>
				</ul>
			</div>

			<div class="bullets" role="tablist" aria-label="Choose testimonial">
				<button v-for="(q, i) in quotes" :key="i" type="button" class="bullet" :class="{ active: i === current }" role="tab" :aria-selected="i === current ? 'true' : 'false'" :aria-label="`Show testimonial ${i + 1}`" @click="goTo(i)" />
			</div>
		</div>
	</section>
</template>
<style scoped>
.testimonials {
	background: linear-gradient(115deg, #fbf6fb 0%, var(--alt_background) 60%);
	border-top: 1px solid var(--decorative_lines);
	padding-top: 2rem;
	padding-bottom: var(--section_block_spacing);

	.content {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.label {
		font: var(--aux_text);
		font-family: "Segoe UI", var(--font_family_main);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--secondary_text);
		text-align: center;
		margin: 0;
	}

	.carousel {
		outline-offset: 4px;
	}

	.track {
		display: flex;
		/* flex-start so each card keeps its own (square) height instead of
		   stretching to the tallest. */
		align-items: flex-start;
		gap: 2.5rem;
		margin: 0;
		/* vertical padding so card shadows aren't clipped — overflow-x:auto
		   forces overflow-y to clip, so the cards need breathing room here. */
		padding: 1.5rem 0;
		list-style: none;
		position: relative;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	.quote {
		/* card never exceeds 50% of the viewport's shorter side (50vmin).
		   Explicit width (not flex-basis) so aspect-ratio derives the height
		   from it — otherwise tall content re-widens the card past the cap. */
		flex: none;
		box-sizing: border-box;
		width: min(68%, 50vmin);
		min-width: 0;
		/* square, capped at 50vmin; typography below scales with the card
		   (vmin) so the content fits the square at any size. */
		aspect-ratio: 1 / 1;
		overflow: hidden;
		scroll-snap-align: start;
		display: flex;
		flex-direction: column;
		gap: 2vmin;
		background-color: var(--alt_background);
		box-shadow: 0 2px 10px rgba(45, 66, 98, 0.08);
		padding: clamp(1rem, 4.5vmin, 2.5rem);
		cursor: pointer;
	}

	.mark {
		font: 700 clamp(1.8rem, 5.5vmin, 3rem)/0.5 var(--font_family_direct_speech);
		color: var(--direct_speech_alt);
	}

	.text {
		font: 400 clamp(0.85rem, 2.5vmin, 1.25rem)/1.4 var(--font_family_main);
		color: var(--root_text);
		margin: 0;
		flex: 1;
		/* safety: never clip — long quotes scroll within the square card */
		overflow-y: auto;
		scrollbar-width: none;
	}

	.text::-webkit-scrollbar {
		display: none;
	}

	.author {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.name {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font: 400 clamp(0.72rem, 2vmin, 1.1rem)/1.4 "Segoe UI", var(--font_family_main);
		text-transform: uppercase;
		color: var(--aux_content);

		.linkedin {
			color: inherit;
			display: inline-flex;
			cursor: pointer;

			svg {
				width: 1.1em;
				height: 1.1em;
			}
		}
	}

	.role {
		font: 400 clamp(0.72rem, 2vmin, 1.1rem)/1.4 var(--font_family_main);
		color: var(--secondary_text);
	}

	.bullets {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
	}

	.bullet {
		flex: 0 1 11rem;
		height: 0.4rem;
		padding: 0;
		border: none;
		border-radius: 1rem;
		background-color: #d4d7d4;
		cursor: pointer;
		transition: background-color 0.2s ease;

		&.active {
			background-color: var(--decorative_lines);
		}

		&:focus-visible {
			outline: 2px solid var(--direct_speech_alt);
			outline-offset: 3px;
		}
	}
}
</style>
