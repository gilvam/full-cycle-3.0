import { Order } from '../entity/order';
import { Customer } from '../entity/customer';
import { OrderItem } from '../entity/order-item';
import { Uuid } from '../../_util/strategy/uuid';

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!items.length) {
      throw new Error('Items are required');
    }

    const order = new Order(Uuid.generate(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);

    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }
}