export type SpotifyId = string;
type SpotifyTrackUri = `spotify:track:${SpotifyId}`;

type SpotifyControllerEvent = {
	data: {
		isPaused: boolean;
		position: number;
	};
};

export type SpotifyController = {
	loadUri: (uri: SpotifyTrackUri) => string;
	play: () => void;
	addListener: (
		event: 'playback_update',
		callback: (event: SpotifyControllerEvent) => void
	) => void;
};

type SpotifyCreateController = (
	element: HTMLElement,
	options: {
		width?: string;
		height?: string;
	},
	callback: (controller: SpotifyController) => void
) => void;

type SpotifyIframeApi = {
	createController: SpotifyCreateController;
};

export type SpotifyOnIframeApiReady = (
	api: SpotifyIframeApi
) => void;
