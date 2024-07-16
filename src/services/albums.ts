import {
	type CollectionEntry,
	getCollection
} from 'astro:content';
import {resolve} from 'node:path';
import {getImageDominantColor} from './images';

export type Album = CollectionEntry<'albums'>['data'] & {
	id: CollectionEntry<'albums'>['id'];
	dominantColor: string;
};

type ActualImageData =
	CollectionEntry<'albums'>['data']['cover'] & {
		fsPath: string;
	};

const coverFilePath = (album: CollectionEntry<'albums'>) =>
	resolve((album.data.cover as ActualImageData).fsPath);

const fromAlbumEntry = async (
	album: CollectionEntry<'albums'>
): Promise<Album> => ({
	...album.data,
	id: album.id,
	dominantColor: await getImageDominantColor(
		coverFilePath(album)
	)
});

export const albumCollection = await getCollection(
	'albums'
).then((albums) => Promise.all(albums.map(fromAlbumEntry)));
