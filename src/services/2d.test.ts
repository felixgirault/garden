import {expect, test} from 'vitest';
import {isAngleAcute} from './2d';

test('isAngleAcute', () => {
	expect(isAngleAcute([0, 0], [1, 0], [2, 0])).toBe(false);
	expect(isAngleAcute([0, 0], [1, 0], [1, 1])).toBe(false);
	expect(isAngleAcute([0, 0], [1, 0], [0, 0.1])).toBe(true);
	expect(isAngleAcute([0, 0], [1, 0], [0, 0])).toBe(true);
});
