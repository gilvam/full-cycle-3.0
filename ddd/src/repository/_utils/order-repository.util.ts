import { OrderItem } from '../../domain/entity/order-item';
import { Order } from '../../domain/entity/order';
import { IOrderItem } from '../../domain/entity/order-item.interface';
import { IOrder } from '../../domain/entity/order.interface';
import { ObjectUtils } from '../../_util/object.utils';
import { ArrayUtils } from '../../_util/array.utils';

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
        (it: IOrderItem) => new OrderItem(it.id, it.name, it.price, it.quantity, it.productId),
      );
      return new Order(order.id, order.customerId, orderItems);
    });
  }
}