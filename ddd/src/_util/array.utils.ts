import { ObjectUtils } from './object.utils';

export class ArrayUtils {
  static isEmpty(array: any[]): boolean {
    if (!array) {
      return true;
    }

    return !array.length || array.some(ObjectUtils.isEmpty);
  }
}
