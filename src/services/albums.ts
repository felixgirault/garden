import {
	Hct,
	argbFromHex
} from '@material/material-color-utilities';
import {type CollectionEntry} from 'astro:content';
import {flatCollection} from './collections';

export type Album = CollectionEntry<'albums'>['data'] & {
	id: CollectionEntry<'albums'>['id'];
	dominantColor: string;
	accentColor?: string;
};

export type IndexedAlbum = Album & {
	index: number;
};

const fromAlbumEntry = (
	album: Album,
	index: number
): IndexedAlbum => ({
	...album,
	index
});

const sortByColor = (albums: IndexedAlbum[]) =>
	albums.toSorted((a, b) => {
		const aHue = Hct.fromInt(argbFromHex(a.dominantColor)).hue;
		const bHue = Hct.fromInt(argbFromHex(b.dominantColor)).hue;
		return bHue - aHue;
	});

// Albums are sorted first so their index is predictable and
// coherent with the covers sprite.
export const albumCollection = await flatCollection('albums')
	.then((albums) =>
		albums.toSorted((a, b) => a.id.localeCompare(b.id))
	)
	.then((albums) => albums.map(fromAlbumEntry))
	.then(sortByColor);
