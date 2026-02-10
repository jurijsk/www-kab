import { defineContentConfig, defineCollection } from '@nuxt/content';
import { z } from 'zod';

const serviceSchema = z.object({
	title: z.string().nonempty(),
	description: z.string().nonempty(),
	skills: z.array(z.string().nonempty()).nonempty(),
	category: z.string()
});

export default defineContentConfig({
	collections: {
		services_zero: defineCollection({
			type: 'data',
			source: 'services/*.json',
			schema: z.object({
				en: serviceSchema,
				de: serviceSchema,
				da: serviceSchema
			})
		}),
		services_one: defineCollection({
			type: 'page',
			source: 'services/test1/*.md',
			schema: z.object({
				group: z.string().nonempty()
			})
		}),

	}
});
