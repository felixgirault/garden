import {defineCollection, z} from 'astro:content';

export const collections = {
	albums: defineCollection({
		type: 'data',
		schema: ({image}) =>
			z.object({
				title: z.string(),
				artist: z.string(),
				description: z.string().optional(),
				cover: image(),
				preview: z.string().url(),
				deezerId: z.number().optional(),
				spotifyId: z.string().optional()
			})
	}),
	archives: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			date: z.date()
		})
	})
};
