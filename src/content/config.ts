import {glob} from 'astro/loaders';
import {defineCollection, z} from 'astro:content';
import {fetchDbData} from '../services/db';
import {fromDbTracks} from '../services/moodboard';

export const collections = {
	albums: defineCollection({
		loader: glob({
			pattern: '*.yml',
			base: './src/content/albums'
		}),
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
		loader: glob({
			pattern: '*.md',
			base: './src/content/archives'
		}),
		schema: z.object({
			title: z.string(),
			date: z.date()
		})
	}),
	devTips: defineCollection({
		loader: glob({
			pattern: '*.md',
			base: './src/content/devTips'
		}),
		schema: z.object({
			title: z.string(),
			tldr: z.string()
		})
	}),
	ideas: defineCollection({
		loader: glob({
			pattern: '*.yml',
			base: './src/content/ideas'
		}),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			features: z.array(z.string())
		})
	}),
	moodboardTracks: defineCollection({
		loader: async () => {
			const tracks = await fetchDbData();
			return fromDbTracks(tracks);
		},
		schema: z.object({
			title: z.string(),
			artist: z.string(),
			energy: z.number(),
			valence: z.number()
		})
	})
};
