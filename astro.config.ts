import {defineConfig, envField} from 'astro/config';
import {FontaineTransform} from 'fontaine';
import fs from 'fs';
import path from 'path';
import {buildSprite} from './src/services/images';

const theme = await fetch(
	'https://raw.githubusercontent.com/felixgirault/grapes-theme/master/themes/Grapes-color-theme.json'
);

// https://astro.build/config
export default defineConfig({
	env: {
		schema: {
			SPOTIFY_CLIENT_ID: envField.string({
				context: 'client',
				access: 'public'
			})
		}
	},
	markdown: {
		shikiConfig: {
			theme: await theme.json()
		}
	},
	vite: {
		plugins: [
			FontaineTransform.vite({
				fallbacks: ['verdana'],
				resolvePath: (id) =>
					new URL(`./public${id}`, import.meta.url)
			})
		]
	},
	integrations: [
		{
			name: 'garden',
			hooks: {
				'astro:config:done': async ({logger}) => {
					logger.info('Generating album covers sprite…');

					const albumsPath = './src/content/albums';
					const coversFileName = 'covers.jpg';
					// Same order as `albumCollection` (sorted by id), so
					// each album index points to its own cover.
					const paths = fs
						.readdirSync(albumsPath)
						.filter((file) => file.endsWith('.yml'))
						.map((file) => file.slice(0, -'.yml'.length))
						.toSorted((a, b) => a.localeCompare(b))
						.map((id) =>
							path.resolve(albumsPath, `${id}.jpg`)
						);

					await buildSprite(
						paths,
						64,
						path.resolve(albumsPath, coversFileName)
					);
				}
			}
		}
	]
});
