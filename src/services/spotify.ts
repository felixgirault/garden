import {SpotifyApi, type Track} from '@spotify/web-api-ts-sdk';
import {SPOTIFY_CLIENT_ID} from 'astro:env/client';

export type SpotifyId = string;
export type SpotifyTrackUri = `spotify:track:${SpotifyId}`;

export type SpotifyPlaybackState = {
	position: number;
	duration: number;
	paused: boolean;
	track_window: {
		current_track: Track;
	};
};

export interface SpotifyPlaybackPlayer {
	new (options: {
		name: string;
		volume?: number;
		getOAuthToken(callback: (token?: string) => void): void;
	}): SpotifyPlaybackPlayer;

	addListener(
		event: 'ready' | 'not_ready',
		listener: (params: {device_id: string}) => void
	): void;

	addListener(
		event:
			| 'initialization_error'
			| 'authentication_error'
			| 'account_error',
		listener: (params: {message: string}) => void
	): void;

	addListener(
		event: 'player_state_changed',
		listener: (state: SpotifyPlaybackState) => void
	): void;

	connect(): void;
	getCurrentState(): Promise<SpotifyPlaybackState>;
}

declare global {
	interface Window {
		Spotify: {
			Player: SpotifyPlaybackPlayer;
		};
	}
}

export const SpotifyCurrentDevice = undefined!;

export const spotifyTrackUri = (
	id: SpotifyId
): SpotifyTrackUri => `spotify:track:${id}`;

export const spotifyRedirectUri = () =>
	new URL(
		'/moodboard',
		document.location.toString()
	).toString();

export const spotifyApi = () =>
	SpotifyApi.withUserAuthorization(
		SPOTIFY_CLIENT_ID,
		spotifyRedirectUri(),
		[
			'streaming',
			'user-read-currently-playing',
			'user-read-playback-state',
			'user-modify-playback-state',
			'user-read-email',
			'user-read-private'
		]
	);
