import {
	type CollectionEntry,
	type CollectionKey,
	getCollection
} from 'astro:content';

export type FlatEntry<C extends CollectionKey> =
	CollectionEntry<C>['data'] & {
		id: CollectionEntry<C>['id'];
	};

const flattenEntry = async <C extends CollectionKey>(
	entry: CollectionEntry<C>
): Promise<FlatEntry<C>> => ({
	...entry.data,
	id: entry.id
});

const flatCollection = <C extends CollectionKey>(type: C) =>
	getCollection(type).then((entries) =>
		Promise.all(entries.map(flattenEntry))
	);

export const albumCollection = await flatCollection('albums');
export const gameCollection = await flatCollection('games');
