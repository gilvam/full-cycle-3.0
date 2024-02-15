import { ArrayUtils } from './array.utils';

describe('Array utils tests', () => {
  it('should be a array empty', () => {
    const arrayEmpty = ArrayUtils.isEmpty([]);
    const arrayWithBrackets = ArrayUtils.isEmpty([{}]);
    const arrayWithNull = ArrayUtils.isEmpty(null as any);
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
});
