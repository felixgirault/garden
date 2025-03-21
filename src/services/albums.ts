import {
	Hct,
	argbFromHex
} from '@material/material-color-utilities';
import {
	type CollectionEntry,
	getCollection
} from 'astro:content';

export type Album = CollectionEntry<'albums'>['data'] & {
	id: CollectionEntry<'albums'>['id'];
	index: number;
	dominantColor: string;
	accentColor?: string;
};

const fromAlbumEntry = (
	album: CollectionEntry<'albums'>,
	index: number
): Album => ({
	...album.data,
	id: album.id,
	index
});

const sortByColor = (albums: Album[]) =>
	albums.toSorted((a, b) => {
		const aHue = Hct.fromInt(argbFromHex(a.dominantColor)).hue;
		const bHue = Hct.fromInt(argbFromHex(b.dominantColor)).hue;
		return bHue - aHue;
	});

// Albums are sorted first so their index is predictable and
// coherent with the covers sprite.
export const albumCollection = await getCollection('albums')
	.then((albums) =>
		albums.toSorted((a, b) => a.id.localeCompare(b.id))
	)
	.then((albums) => albums.map(fromAlbumEntry))
	.then(sortByColor);
