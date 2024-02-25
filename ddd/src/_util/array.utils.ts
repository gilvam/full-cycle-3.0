import { ObjectUtils } from '@util/object.utils';

export class ArrayUtils {
	static isEmpty<T>(array: T[]): boolean {
		if (!array) {
			return true;
		}

		return !array.length || array.some(ObjectUtils.isEmpty);
	}

	static hasIndex(index: number): boolean {
		return index >= 0;
	}
}
