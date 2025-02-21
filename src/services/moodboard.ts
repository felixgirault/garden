import {type DbData, DbTrackAttributesMax} from './db';
import {round} from './math';
import type {SpotifyId} from './spotify';

export type MoodboardTrack = {
	id: SpotifyId;
	title: string;
	artist: string;
	energy: number;
	valence: number;
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
			energy: round(
				(track.attributes.energy / DbTrackAttributesMax) *
					100,
				2
			),
			valence: round(
				(track.attributes.valence / DbTrackAttributesMax) *
					100,
				2
			)
		}));
};
