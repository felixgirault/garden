import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {parse, stringify} from 'yaml';
import {getImagePalette} from '../services/images';

const albumsPath = path.resolve(
	fileURLToPath(import.meta.url),
	'../../content/albums'
);

const fileNames = fs
	.readdirSync(albumsPath)
	.filter((file) => file.endsWith('.yml'));

for (const fileName of fileNames) {
	const ymlPath = path.resolve(albumsPath, fileName);
	const yml = fs.readFileSync(ymlPath, 'utf-8');
	const data = parse(yml);
	const {dominant, accent} = await getImagePalette(
		path.resolve(albumsPath, data.cover)
	);

	data.dominantColor = dominant;
	data.accentColor = accent;

	fs.writeFileSync(ymlPath, stringify(data));
}
