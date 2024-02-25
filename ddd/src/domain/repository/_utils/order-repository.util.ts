import { Order } from '@d-entity/order';
import { OrderItem } from '@d-entity/order-item';
import { IOrderItem } from '@d-entity/order-item.interface';
import { IOrder } from '@d-entity/order.interface';
import { ArrayUtils } from '@util/array.utils';
import { ObjectUtils } from '@util/object.utils';

export class OrderRepositoryUtil {
	static redoOrder(response: IOrder): Order {
		const order = OrderRepositoryUtil.redoOrderList([response]).find(Boolean);

		if (!order) {
			throw new Error('Order not found');
		}

		return order;
	}

	static redoOrderList(response: IOrder[]): Order[] {
		if (ObjectUtils.isEmpty(response) || ArrayUtils.isEmpty(response)) {
			throw new Error('Order not found');
		}

		return response.map((order) => {
			const orderItems = order.items.map(
				(it: IOrderItem) => new OrderItem(it.id, it.name, it.price, it.quantity, it.productId)
			);
			return new Order(order.id, order.customerId, orderItems);
		});
	}
}
