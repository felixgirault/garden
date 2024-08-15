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
				microCover: z.string().url(),
				preview: z.string().url(),
				deezerId: z.number().optional(),
				spotifyId: z.string().optional(),
				dominantColor: z.string(),
				accentColor: z.string()
			})
	}),
	archives: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			date: z.date()
		})
	}),
	games: defineCollection({
		type: 'content',
		schema: ({image}) =>
			z.object({
				title: z.string(),
				cover: image(),
				isFeatured: z.boolean().default(false),
				steamId: z.number().optional()
			})
	})
};
