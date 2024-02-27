import { Product } from '@d-entity/product';

describe('Product unit tests', () => {
	it('should throw error when id is empty', () => {
		const throwError = () => new Product('', 'product 1', 100);

		expect(throwError).toThrowError('Id is required');
	});

	it('should throw error when name is empty', () => {
		const throwError = () => new Product('1', '', 100);

		expect(throwError).toThrowError('Name is required');
	});

	it('should throw error when price is empty', () => {
		const throwError = () => new Product('1', 'product 1', 0);

		expect(throwError).toThrowError('Price is required');
	});

	it('should change name', () => {
		const product = new Product('1', 'product 1', 100);
		const spy = jest.spyOn(product, 'changeName');

		product.changeName('product 2');

		expect(spy).toHaveBeenCalledWith('product 2');
	});

	it('should change price', () => {
		const product = new Product('1', 'product 1', 100);
		const spy = jest.spyOn(product, 'changePrice');

		product.changePrice(200);

		expect(spy).toHaveBeenCalledWith(200);
	});
});
