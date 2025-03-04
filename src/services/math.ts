export const clamp = (
	number: number,
	min: number,
	max: number
) => (number < min ? min : number > max ? max : number);

// @see https://stackoverflow.com/a/48764436
export const round = (exp: number, places = 4) => {
	exp = Math.round(Number(`${exp}e+${places}`));
	return Number(`${exp}e-${places}`);
};

// @see https://stackoverflow.com/a/7616484/2391359
export const hashCode = (string: string) => {
	let hash = 0;
	let char;

	if (!string.length) {
		return hash;
	}

	for (let i = 0; i < string.length; i++) {
		char = string.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0;
	}

	return hash;
};

export const shuffled = <T>(array: T[]) => {
	const copy = [...array];

	for (let i = copy.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}

	return copy;
};

// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
export const random = (min: number, max: number) => {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);

	return Math.floor(
		Math.random() * (maxFloored - minCeiled) + minCeiled
	);
};

// @see https://stackoverflow.com/a/17445304/2391359
export const gcd = (a: number, b: number): number =>
	b ? gcd(b, a % b) : Math.abs(a);

// @see https://www.geeksforgeeks.org/eulers-totient-function/
export const findCoprime = (n: number, start = 0) => {
	for (let i = start; i < n; i++) {
		if (gcd(i, n) === 1) {
			return i;
		}
	}

	return 1;
};

// Yields each number from 0 to count in a random order.
// @see https://en.wikipedia.org/wiki/Full_cycle
export function* randomIndices(count: number) {
	// We're skipping the first coprimes as they yield poor
	// results. Higher numbers feel more random.
	const increment = findCoprime(count, Math.round(count / 3));
	let index = random(0, count);

	for (let i = 0; i < count; i++) {
		index = (index + increment) % count;
		yield index;
	}
}
