const DeezerApiBaseUrl = 'https://api.deezer.com';

export type DeezerArtist = {
	id: string;
	name: string;
};

export type DeezerTrack = {
	id: string;
	title: string;
	link: string;
	artist: DeezerArtist;
};

export type DeezerPlaylistTrack = DeezerTrack & {
	time_add: number;
};

export type DeezerPlaylist = DeezerTrack & {
	type: 'playlist';
	id: string;
	tracks: {
		data: DeezerPlaylistTrack[];
	};
};

export const fetchPlaylistTracks = async (id: string) => {
	const response = await fetch(
		`${DeezerApiBaseUrl}/playlist/${id}`
	);

	const playlist: DeezerPlaylist = await response.json();
	return playlist.tracks.data;
};
