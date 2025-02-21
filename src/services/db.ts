import {round} from './math';
import type {SpotifyId} from './spotify';

type DbArtist = {
	id: string;
	name: string;
};

type DbTrackAttributes = {
	energy: number;
	valence: number;
};

type DbTrack = {
	id: string;
	title: string;
	artistId: DbArtist['id'];
	spotifyId: SpotifyId;
	attributes: DbTrackAttributes;
};

type DbData = {
	tracks: Record<DbTrack['id'], DbTrack>;
	artists: Record<DbArtist['id'], DbArtist>;
};

const DbBaseUrl = 'https://db.fglt.fr';
const DbTrackAttributesMax = 5;

export const fetchDbTracks = async () => {
	const response = await fetch(`${DbBaseUrl}/data.json`);
	const data = (await response.json()) as DbData;
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
