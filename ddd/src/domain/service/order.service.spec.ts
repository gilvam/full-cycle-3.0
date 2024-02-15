import OrderService from './order.service';
import { OrderItem } from '../entity/order-item';
import { Order } from '../entity/order';
import { Customer } from '../entity/customer';

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1');
    const item1 = new OrderItem('i1', 'Item 1', 10, 1, 'p1');

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it('should get total of all orders with AAA pattern', () => {
    const orderItem1 = new OrderItem('1', 'p1', 100, 1, 'p1');
    const orderItem2 = new OrderItem('2', 'p2', 200, 2, 'p2');

    const order1 = new Order('1', 'c1', [orderItem1]);
    const order2 = new Order('2', 'c1', [orderItem2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });

  it('should add reward points', () => {
    const customer = new Customer('c1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it('should Items are required', () => {
    const customer = new Customer('c1', 'Customer 1');
    const throwError = () => OrderService.placeOrder(customer, []);

    expect(throwError).toThrowError('Items are required');
  });
});
