import {type Loader, file} from 'astro/loaders';
import {existsSync, promises as fs} from 'node:fs';

export function cachedLoader(options: {
	loader: Loader;
	useCached?: boolean;
}) {
	return {
		...options.loader,
		name: `cached-${options.loader.name}`,
		load: async (context) => {
			const {config, collection, store, logger} = context;
			const path = `./src/content/${collection}.json`;
			const url = new URL(path, config.root);

			const loadFromFile = async () => {
				logger.info(
					`Loading cached collection ${collection}`
				);

				if (!existsSync(url)) {
					throw new Error(
						`Missing cached content for collection ${collection}`
					);
				}

				try {
					await file(path).load(context);
				} catch (error) {
					logger.error(
						`Error loading cached collection ${collection}: ${error}`
					);

					throw error;
				}
			};

			const loadFromLoader = async () => {
				logger.info(
					`Loading collection ${collection} from ${options.loader.name}`
				);

				try {
					await options.loader.load(context);
				} catch (error) {
					logger.error(
						`Error loading collection ${collection}: ${error}`
					);

					throw error;
				}
			};

			const cacheEntries = async () => {
				const entries: Record<
					string,
					Record<string, unknown>
				> = {};

				for (const {id, data} of store.values()) {
					entries[id] = data;
				}

				try {
					logger.info(`Caching collection ${collection}`);

					await fs.writeFile(
						url,
						JSON.stringify(entries, null, '\t'),
						'utf-8'
					);
				} catch (error) {
					logger.error(
						`Error caching collection ${collection}: ${error}`
					);
				}
			};

			if (options.useCached) {
				await loadFromFile();
				return;
			}

			try {
				await loadFromLoader();
				await cacheEntries();
			} catch (error) {
				// Falls back to cached data when the loader fails.
				await loadFromFile();
			}
		}
	} satisfies Loader;
}
