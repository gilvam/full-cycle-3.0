import { OrderItem } from '@d-entity/order-item';

describe('Order item unit tests', () => {
	it('should calculate total', () => {
		const item = new OrderItem('1', 'Item 1', 10, 2, 'p1');

		expect(item.total()).toBe(20);
	});

	it('should throw error when price is less or equal zero', () => {
		const item = new OrderItem('1', 'Item 1', 10, 1, 'p1');

		expect(item.price).toBe(10);
	});

	it('should throw error if the item quantity is less or equal zero', () => {
		const throwError = () => new OrderItem('1', 'Item 1', 10, 0, 'p1');

		expect(throwError).toThrowError('Quantity must be greater than zero');
	});

	it('should throw error if the item quantity must be greater than zero', () => {
		const throwError = () => new OrderItem('1', 'Item 1', 10, 0, 'p1');

		expect(throwError).toThrowError('Quantity must be greater than zero');
	});
});
