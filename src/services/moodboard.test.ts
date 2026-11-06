import {describe, expect, test} from 'vitest';
import type {Point} from './2d';
import {
	type MoodboardTrack,
	MoodboardTrackIndex
} from './moodboard';

// A 20x20 grid of tracks, each position used twice to cover
// tracks sharing the same coordinates.
const tracks: MoodboardTrack[] = Array.from(
	{length: 800},
	(_, i) => ({
		id: `${i}`,
		title: `Track ${i}`,
		artist: 'Artist',
		duration: 180,
		valence: (Math.floor(i / 2) % 20) / 19,
		energy: Math.floor(i / 40) / 19,
		isAlbumHighlight: false
	})
);

const paths: Record<string, Point[]> = {
	chill: [
		[0.6, 0.1],
		[0.9, 0.1]
	],
	diagonal: [
		[0, 0],
		[1, 1]
	],
	corner: [
		[0, 0],
		[0.05, 0.05]
	]
};

describe('MoodboardTrackIndex.searchAlongPath', () => {
	const index = new MoodboardTrackIndex(tracks);

	for (const [name, path] of Object.entries(paths)) {
		for (const limit of [10, 50, 100]) {
			test(`finds ${limit} distinct tracks along ${name}`, () => {
				const found = index
					.searchAlongPath(path, limit)
					.filter((track) => !!track);

				expect(found).toHaveLength(limit);
				expect(new Set(found.map(({id}) => id)).size).toBe(
					limit
				);
			});
		}
	}
});
