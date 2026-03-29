declare class SpotifyPlayer {
	constructor(options: {
		name: string;
		volume?: number;
		getOAuthToken(callback: (token: string) => void): void;
	});
}

interface window {
	Spotify: {
		Player: SpotifyPlayer;
	};
}
