import quantize from 'quantize';
import sharp from 'sharp';

// This code is inspired from `pure-color-thief-node`, wich
// worked as expected but was a pain to use with typscript.
// Also, using sharp, which is provided by Astro, makes the
// code shorter, more performant and allows for more input
// formats.
// @see https://github.com/CafuChino/pure-color-thief-node
export const getImagePalette = async (
	path: string,
	count: number
): Promise<string[]> => {
	const buffer = await sharp(path)
		.removeAlpha()
		.raw()
		.toBuffer();
	const pixels = Array(buffer.length / 3);

	for (let i = 0; i < buffer.length; i += 3) {
		pixels[i] = [buffer[i], buffer[i + 1], buffer[i + 2]];
	}

	const q = quantize(pixels, Math.max(2, count));

	if (!q) {
		return [];
	}

	return q
		.palette()
		.map(([r, g, b]) => `rgb(${r}, ${g}, ${b})`);
};

export const getImageDominantColor = async (path: string) => {
	const palette = await getImagePalette(path, 1);
	return palette[0];
};
