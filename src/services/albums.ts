import {
	type CollectionEntry,
	getCollection
} from 'astro:content';

export type Album = CollectionEntry<'albums'>['data'] & {
	id: CollectionEntry<'albums'>['id'];
	dominantColor: string;
	accentColor?: string;
};

const fromAlbumEntry = (
	album: CollectionEntry<'albums'>
): Album => ({
	...album.data,
	id: album.id
});

export const albumCollection = await getCollection(
	'albums'
).then((albums) => albums.map(fromAlbumEntry));
