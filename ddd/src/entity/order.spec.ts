import { Order } from './order';
import { OrderItem } from './order-item';

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    const throwError = () => new Order('', '123', []);

    expect(throwError).toThrowError('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    const throwError = () => new Order('1', '', []);

    expect(throwError).toThrowError('CustomerId is required');
  });

  it('should throw error when items are empty', () => {
    const throwError = () => new Order('1', '123', []);

    expect(throwError).toThrowError('Items are required');
  });

  it('should calculate total', () => {
    const orderItems = [
      new OrderItem('1', 'Item 1', 10),
      new OrderItem('2', 'Item 2', 15),
    ];
    const order = new Order('1', '123', orderItems);

    expect(order.total()).toBe(25);
  });
});