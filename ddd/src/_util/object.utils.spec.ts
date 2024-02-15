import { ObjectUtils } from './object.utils';

describe('Object utils tests', () => {
  it('should equals', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const obj3 = { a: 1, b: 3 };

    expect(ObjectUtils.isEquals(obj1, obj2)).toBe(true);
    expect(ObjectUtils.isEquals(obj1, obj3)).toBe(false);
  });

  it('should no equals', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const obj3 = { a: 1, b: 3 };

    expect(ObjectUtils.notEquals(obj1, obj2)).toBe(false);
    expect(ObjectUtils.notEquals(obj1, obj3)).toBe(true);
  });

  it('shold keys1 diferent from keys2', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2 };

    expect(ObjectUtils.isEquals(obj1, obj2)).toBe(false);
  });

  it('should object is not empty', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const obj2 = 1;

    expect(ObjectUtils.isEmpty(obj)).toBe(false);
    expect(ObjectUtils.isEmpty(obj2)).toBe(false);
  });

  it('should object is empty', () => {
    const obj = {};
    const obj2 = [] as any;
    const obj3 = null;
    const obj4 = undefined;

    expect(ObjectUtils.isEmpty(obj)).toBe(true);
    expect(ObjectUtils.isEmpty(obj2)).toBe(true);
    expect(ObjectUtils.isEmpty(obj3)).toBe(true);
    expect(ObjectUtils.isEmpty(obj4)).toBe(true);
  });
});
