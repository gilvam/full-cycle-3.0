import { Customer } from '@d-entity/customer';
import { Order } from '@d-entity/order';
import { OrderItem } from '@d-entity/order-item';
import { Uuid } from '@util/strategy/uuid';

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
