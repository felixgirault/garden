import {glob} from 'astro/loaders';
import {z} from 'astro/zod';
import {defineCollection} from 'astro:content';
import {cachedLoader} from './loaders/cached';
import {dbTracksLoader} from './loaders/dbTracks';
import {deezerPlaylistLoader} from './loaders/deezerPlaylist';

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
	earworms: defineCollection({
		loader: cachedLoader({
			useCached: import.meta.env.USE_CACHED_COLLECTIONS,
			loader: deezerPlaylistLoader({
				playlistId: '15627881223'
			})
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
		loader: cachedLoader({
			loader: dbTracksLoader()
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
