import {glob} from 'astro/loaders';
import {z} from 'astro/zod';
import {defineCollection} from 'astro:content';
import {fetchDbData} from './services/db';
import {fromDbTracks} from './services/moodboard';

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
				microCover: z.url(),
				preview: z.url(),
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
			duration: z.number(),
			energy: z.number(),
			valence: z.number(),
			isAlbumHighlight: z.boolean()
		})
	}),
	webrings: defineCollection({
		loader: glob({
			pattern: '*.md',
			base: './src/content/webrings'
		}),
		schema: z.object({
			title: z.string(),
			icon: z.string(),
			url: z.url(),
			previousUrl: z.url(),
			nextUrl: z.url(),
			randomUrl: z.url()
		})
	})
};
