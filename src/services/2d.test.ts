import {expect, test, vi} from 'vitest';
import {isAngleAcute, makePath} from './2d';

test('makePath', () => {
	const calls: unknown[][] = [];

	vi.stubGlobal(
		'Path2D',
		class {
			moveTo = (...args: number[]) =>
				calls.push(['M', ...args]);
			lineTo = (...args: number[]) =>
				calls.push(['L', ...args]);
			quadraticCurveTo = (...args: number[]) =>
				calls.push(['Q', ...args]);
		}
	);

	makePath([
		[0, 0],
		[2, 0],
		[2, 2]
	]);

	vi.unstubAllGlobals();
	expect(calls).toEqual([
		['M', 0, 0],
		['Q', 2, 0, 2, 1],
		['L', 2, 2]
	]);
});

test('isAngleAcute', () => {
	expect(isAngleAcute([0, 0], [1, 0], [2, 0])).toBe(false);
	expect(isAngleAcute([0, 0], [1, 0], [1, 1])).toBe(false);
	expect(isAngleAcute([0, 0], [1, 0], [0, 0.1])).toBe(true);
	expect(isAngleAcute([0, 0], [1, 0], [0, 0])).toBe(true);
});
