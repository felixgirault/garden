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

	const playlist = (await response.json()) as DeezerPlaylist;

	return playlist.tracks.data
		.map((track) => ({
			id: track.id.toString(),
			title: track.title,
			url: track.link,
			artist: track.artist.name,
			date: new Date(track.time_add * 1000)
		}))
		.toSorted((a, b) => b.date.getTime() - a.date.getTime());
};
