import fs from 'fs';
import path from 'path';
import readline from 'readline/promises';
import {Readable} from 'stream';
import {finished} from 'stream/promises';
import type {ReadableStream} from 'stream/web';
import {fileURLToPath} from 'url';
import {stringify} from 'yaml';
import {
	getImagePalette,
	getThumbnailData
} from '../services/images';
import {slugify} from '../services/strings';

type DeezerAlbum = {
	title: string;
	cover_medium: string;
	artist: {
		name: string;
	};
	tracks: {
		data: Array<{
			title: string;
			preview: string;
		}>;
	};
};

if (process.argv.length < 3) {
	throw new Error();
}

const id = parseInt(process.argv[2]);
const url = `https://api.deezer.com/album/${id}`;
const response = await fetch(url);
const album = (await response.json()) as DeezerAlbum;
const slug = process.argv?.[4] || slugify(album.title);
const albumsPath = path.resolve(
	fileURLToPath(import.meta.url),
	'../../content/albums'
);

const coverPath = path.resolve(albumsPath, `${slug}.jpg`);
const coverStream = fs.createWriteStream(coverPath);
const {body} = await fetch(album.cover_medium);

await finished(
	Readable.fromWeb(body as ReadableStream<any>).pipe(
		coverStream
	)
);

const {dominant, accent} = await getImagePalette(coverPath);
const microCover = await getThumbnailData(coverPath);
const tracksInfo = album.tracks.data.map((track) => [
	track.title,
	track.preview
]);

console.log('Preview tracks:');
console.table(tracksInfo);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const previewTrackIndex = parseInt(
	await rl.question('Preview track index? ')
);

rl.close();

const data = {
	title: album.title,
	artist: album.artist.name,
	cover: `./${slug}.jpg`,
	preview: album.tracks.data[previewTrackIndex].preview,
	deezerId: id,
	dominantColor: dominant,
	accentColor: accent,
	microCover
};

fs.writeFileSync(
	path.resolve(albumsPath, `${slug}.yml`),
	stringify(data)
);
