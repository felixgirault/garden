import type {Loader} from 'astro/loaders';
import {z} from 'astro/zod';
import {fetchPlaylistTracks} from '../services/deezer.js';

export function deezerPlaylistLoader(options: {
	playlistId: string;
}) {
	return {
		name: 'deezer-playlist-loader',
		load: async ({store, parseData, logger}) => {
			logger.info(
				`Loading playlist #${options.playlistId} from Deezer`
			);

			const tracks = await fetchPlaylistTracks(
				options.playlistId
			);

			store.clear();

			for (const track of tracks) {
				const id = track.id.toString();
				const data = {
					title: track.title,
					url: track.link,
					artist: track.artist.name
				};

				const parsedData = await parseData({
					id,
					data
				});

				store.set({
					id: track.id.toString(),
					data: parsedData
				});
			}
		},
		schema: z.object({
			title: z.string(),
			url: z.string(),
			artist: z.string()
		})
	} satisfies Loader;
}
