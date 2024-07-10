import {
	type CollectionEntry,
	getCollection
} from 'astro:content';
import {resolve} from 'node:path';
import {getImageDominantColor} from './images';

type ActualImageData =
	CollectionEntry<'albums'>['data']['cover'] & {
		fsPath: string;
	};

export const coverFilePath = (
	album: CollectionEntry<'albums'>
) => resolve((album.data.cover as ActualImageData).fsPath);

export const albumCollection = await getCollection('albums');
export const albumColors = await Promise.all(
	albumCollection
		.map(coverFilePath)
		.map((path) => getImageDominantColor(path))
);
