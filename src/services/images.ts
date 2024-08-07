import {
	Hct,
	QuantizerCelebi,
	Score,
	argbFromRgb,
	hexFromArgb
} from '@material/material-color-utilities';
import sharp from 'sharp';

type ImagePalette = {
	dominant: string;
	accent?: string;
};

const InvalidArgbColor = 1000000000;
const TargetChroma = 100;
const TargetTone = 65;
const MinimalAccentTone = 65;

const getImagePixels = async (image: sharp.Sharp) => {
	const buffer = await image.removeAlpha().raw().toBuffer();
	const pixels: number[] = [];

	for (let i = 0; i < buffer.length; i += 3) {
		const r = buffer[i];
		const g = buffer[i + 1];
		const b = buffer[i + 2];

		pixels.push(argbFromRgb(r, g, b));
	}

	return pixels;
};

// This code uses the same mechanics as `sourceColorFromImage()`,
// but using sharp instead of an HTML canvas to load the
// image.
// @see https://github.com/material-foundation/material-color-utilities/blob/main/typescript/utils/image_utils.ts#L29
const findAccentColor = async (image: sharp.Sharp) => {
	const pixels = await getImagePixels(image);
	const quantized = QuantizerCelebi.quantize(pixels, 5);
	const scored = Score.score(quantized, {
		desired: 10,
		fallbackColorARGB: InvalidArgbColor,
		filter: false
	});

	const sorted = scored
		.filter((color) => color !== InvalidArgbColor)
		.map((color) => {
			const hct = Hct.fromInt(color);
			const toneDistance = Math.abs(TargetTone - hct.tone);
			const chromaDistance = Math.abs(
				TargetChroma - hct.chroma
			);

			return {
				color: hct.toInt(),
				score: (toneDistance + chromaDistance) / 2
			};
		})
		.toSorted((a, b) => a.score - b.score);

	return sorted?.[0]?.color;
};

const findDominantColor = async (image: sharp.Sharp) => {
	const pixels = await getImagePixels(
		image.removeAlpha().resize(1, 1)
	);

	return pixels[0];
};

export const getImagePalette = async (
	path: string
): Promise<ImagePalette> => {
	const image = sharp(path);
	const accent = await findAccentColor(image);
	const dominant = await findDominantColor(image);
	const accentHct = Hct.fromInt(accent || dominant);
	accentHct.tone = Math.max(accentHct.tone, MinimalAccentTone);

	return {
		dominant: hexFromArgb(dominant),
		accent: accent ? hexFromArgb(accentHct.toInt()) : undefined
	};
};

// @see https://github.com/lovell/sharp/issues/1337#issuecomment-412880172
export const getThumbnailData = async (
	path: string,
	size = 10
): Promise<string> => {
	const buffer = await sharp(path)
		.resize(size)
		.webp()
		.toBuffer();

	return `data:image/webp;base64,${buffer.toString('base64')}`;
};
