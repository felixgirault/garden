import type {SpotifyId} from './spotify';

type DbArtist = {
	id: string;
	name: string;
};

type DbTrackAttributes = {
	energy: number;
	valence: number;
};

export type DbTrack = {
	id: string;
	title: string;
	artistId: DbArtist['id'];
	spotifyId: SpotifyId;
	attributes: DbTrackAttributes;
};

export type DbData = {
	tracks: Record<DbTrack['id'], DbTrack>;
	artists: Record<DbArtist['id'], DbArtist>;
};

const DbBaseUrl = 'https://db.fglt.fr';
export const DbTrackAttributesMax = 5;

export const fetchDbData = async () => {
	const response = await fetch(`${DbBaseUrl}/data.json`);
	return (await response.json()) as DbData;
};
