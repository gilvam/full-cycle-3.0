import { ArrayUtils } from '@util/array.utils';

describe('Array utils tests', () => {
	it('should be a array empty', () => {
		const arrayEmpty = ArrayUtils.isEmpty([]);
		const arrayWithBrackets = ArrayUtils.isEmpty([{}]);
		const arrayWithNull = ArrayUtils.isEmpty(null as never);
		const arrayWithManyValues = ArrayUtils.isEmpty([{}, {}, [], false, 0, null, undefined, NaN, '']);

		expect(arrayEmpty).toBe(true);
		expect(arrayWithBrackets).toBe(true);
		expect(arrayWithNull).toBe(true);
		expect(arrayWithManyValues).toBe(true);
	});

	it('should be a array with valid values', () => {
		const arrayWithNumber = ArrayUtils.isEmpty([1]);
		const arrayWithNumbers = ArrayUtils.isEmpty([1, 2]);
		const arrayWithStrings = ArrayUtils.isEmpty(['a', 'b']);
		const arrayWithObjects = ArrayUtils.isEmpty([{ a: 1 }, { b: 2 }]);

		expect(arrayWithNumber).toBe(false);
		expect(arrayWithNumbers).toBe(false);
		expect(arrayWithStrings).toBe(false);
		expect(arrayWithObjects).toBe(false);
	});

	it('should be a valid index', () => {
		expect(ArrayUtils.hasIndex(0)).toBeTruthy();
		expect(ArrayUtils.hasIndex(1)).toBeTruthy();
		expect(ArrayUtils.hasIndex(10)).toBeTruthy();
	});

	it('should be a invalid index', () => {
		expect(ArrayUtils.hasIndex(-1)).toBeFalsy();
	});
});
