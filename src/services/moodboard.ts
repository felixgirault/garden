import kdTree from 'kd-tree-javascript';
import {type Point, interpolateSpline} from './2d';
import {type DbData, DbTrackAttributesMax} from './db';
import {randomIndices, round} from './math';
import type {SpotifyId} from './spotify';

export type MoodboardTrack = {
	id: SpotifyId;
	title: string;
	artist: string;
	duration: number;
	energy: number;
	valence: number;
	isAlbumHighlight: boolean;
};

export const fromDbTracks = (data: DbData): MoodboardTrack[] => {
	const {tracks, artists} = data;

	return Object.values(tracks)
		.filter(
			(track) =>
				'spotifyId' in track &&
				'attributes' in track &&
				'energy' in track.attributes &&
				'valence' in track.attributes
		)
		.map((track) => ({
			id: track.spotifyId,
			title: track.title,
			artist: artists[track.artistId].name,
			duration: track.duration,
			energy: round(
				track.attributes.energy / DbTrackAttributesMax,
				3
			),
			valence: round(
				track.attributes.valence / DbTrackAttributesMax,
				3
			),
			isAlbumHighlight: !!track?.isAlbumHighlight
		}));
};

export class MoodboardTrackIndex {
	#tracks: MoodboardTrack[];
	#tree: kdTree.kdTree<MoodboardTrack>;

	constructor(tracks: MoodboardTrack[]) {
		this.#tracks = tracks;
		this.#tree = new kdTree.kdTree(
			tracks,
			(a, b) =>
				(a.valence - b.valence) ** 2 +
				(a.energy - b.energy) ** 2,
			['valence', 'energy']
		);
	}

	searchAlongPath(path: Point[], limit = 50) {
		const points = interpolateSpline(path, limit - 1);

		// Instead of searching for many neighbors everytime,
		// a small search is made first, which should cover
		// almost every case. If there is not enough results,
		// the search is made again with a greater search
		// radius. Then rinse and repeat.
		const neighbors = points.map(function* (
			this: MoodboardTrackIndex,
			[valence, energy]
		) {
			let count = 3;
			let lowerBound = 0;

			while (count < this.#tracks.length) {
				const nearest = this.#tree
					.nearest(
						{
							valence,
							energy
						} as MoodboardTrack,
						count
					)
					.filter(([_, d]) => d > lowerBound)
					.toSorted((a, b) => a[1] - b[1]);

				for (const [track] of nearest) {
					yield track;
				}

				const farthest = nearest.at(-1);
				lowerBound = farthest ? farthest[1] : lowerBound;
				count *= 3;
			}
		}, this);

		const used = new WeakSet<MoodboardTrack>();
		const nearestTracks: MoodboardTrack[] = [];

		// Traversing neighbors in a random order avoids
		// accumulating errors to the end of the list.
		for (const i of randomIndices(neighbors.length)) {
			const next = neighbors[i];

			for (const track of next) {
				if (!used.has(track)) {
					used.add(track);
					nearestTracks[i] = track;
					break;
				}
			}
		}

		return nearestTracks;
	}
}
