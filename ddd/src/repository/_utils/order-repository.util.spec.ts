import { Order } from '../../domain/entity/order';
import { OrderItem } from '../../domain/entity/order-item';
import { OrderRepositoryUtil } from './order-repository.util';
import { IOrder } from '../../domain/entity/order.interface';

const iOrderList: IOrder[] = [
  {
    id: '1',
    customerId: '123',
    items: [
      {
        id: '1',
        name: 'Item 1',
        price: 10,
        quantity: 1,
        productId: 'p1',
      },
    ],
  },
  {
    id: '2',
    customerId: '123',
    items: [
      {
        id: '2',
        name: 'Item 2',
        price: 20,
        quantity: 2,
        productId: 'p2',
      },
    ],
  },
];

describe('OrderRepositoryUtil unit tests', () => {
  it('should redo order list', () => {
    const orderItems = iOrderList.map((it) => {
      const items = it.items.map(
        (it) => new OrderItem(it.id, it.name, it.price, it.quantity, it.productId),
      );
      return new Order(it.id, it.customerId, items);
    });

    const response = OrderRepositoryUtil.redoOrderList(iOrderList);

    expect(response).toEqual(orderItems);
  });

  it('should redo order', () => {
    const iOrder: IOrder = iOrderList.at(0) as IOrder;
    const orderItems = iOrder.items.map(
      (it) => new OrderItem(it.id, it.name, it.price, it.quantity, it.productId),
    );
    const order = new Order(iOrder.id, iOrder.customerId, orderItems);

    const response = OrderRepositoryUtil.redoOrder(order);

    expect(response).toEqual(order);
  });

  it('should throw error when order not found: []', () => {
    const response = () => OrderRepositoryUtil.redoOrderList([]);

    expect(response).toThrowError('Order not found');
  });

  it('should throw error when order is not an interface Order array: {}', () => {
    const response = () => OrderRepositoryUtil.redoOrderList({} as IOrder[]);

    expect(response).toThrowError('Order not found');
    // expect(response).toEqual(order);
  });
});
