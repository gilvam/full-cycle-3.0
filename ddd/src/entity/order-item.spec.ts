import { OrderItem } from './order-item';

describe('Order item unit tests', () => {
  it('should calculate total', () => {
    const item = new OrderItem('1', 'Item 1', 10, 2);

    expect(item.total()).toBe(20);
  });

  it('should throw error when price is less or equal zero', () => {
    const item = new OrderItem('1', 'Item 1', 10, 1);

    expect(item.price).toBe(10);
  });
});
