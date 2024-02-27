export class ObjectUtils {
	static isEquals<T>(obj1: Partial<T>, obj2: Partial<T>): boolean {
		const keys1 = Object.keys(obj1) as (keyof T)[];
		const keys2 = Object.keys(obj2) as (keyof T)[];

		if (keys1.length !== keys2.length) {
			return false;
		}

		return keys1.every((key) => obj1[key] === obj2[key]);
	}

	static notEquals<T>(obj1: Partial<T>, obj2: Partial<T>): boolean {
		return !this.isEquals(obj1, obj2);
	}

	static isEmpty<T>(obj: T | T[]): boolean {
		if (!obj) {
			return true;
		}

		if (Number.isInteger(obj)) {
			return false;
		}

		return !Object.keys(obj).length;
	}
}
