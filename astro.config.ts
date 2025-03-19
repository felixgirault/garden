import {defineConfig} from 'astro/config';
import {FontaineTransform} from 'fontaine';
import fs from 'fs';
import path from 'path';
import {buildSprite} from './src/services/images';

const theme = await fetch(
	'https://raw.githubusercontent.com/felixgirault/grapes-theme/master/themes/Grapes-color-theme.json'
);

// https://astro.build/config
export default defineConfig({
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
					const paths = fs
						.readdirSync(albumsPath)
						.filter(
							(file) =>
								file.endsWith('.jpg') &&
								file !== coversFileName
						)
						.toSorted((a, b) => a.localeCompare(b))
						.map((fileName) =>
							path.resolve(albumsPath, fileName)
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
