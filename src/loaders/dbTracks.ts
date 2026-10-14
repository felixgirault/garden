import type {Loader} from 'astro/loaders';
import {z} from 'astro/zod';
import {fetchDbData} from '../services/db.js';
import {fromDbTracks} from '../services/moodboard.js';

export function dbTracksLoader() {
	return {
		name: 'db-tracks-loader',
		load: async ({store, parseData, logger}) => {
			logger.info(`Loading tracks from db`);

			const data = await fetchDbData();
			const tracks = fromDbTracks(data);

			store.clear();

			for (const track of tracks) {
				const parsedData = await parseData({
					id: track.id,
					data: track
				});

				store.set({
					id: track.id,
					data: parsedData
				});
			}
		},
		schema: z.object({
			title: z.string(),
			artist: z.string(),
			duration: z.number(),
			energy: z.number(),
			valence: z.number(),
			isAlbumHighlight: z.boolean()
		})
	} satisfies Loader;
}
