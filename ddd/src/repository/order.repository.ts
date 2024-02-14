import { IOrderRepository } from './_models/order-repository.interface';
import { Order } from '../domain/entity/order';
import OrderDb from '../infrastructure/db/sequelize/models/order.db';
import OrderItemDb from '../infrastructure/db/sequelize/models/order-item.db';

export default class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderDb.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        items: entity.items.map((it) => ({
          id: it.id,
          productId: it.productId,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
        })),
        total: entity.total(),
      },
      { include: [{ model: OrderItemDb }] },
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderDb.update(
      {
        customerId: entity.customerId,
        items: entity.items,
        total: entity.total(),
      },
      { where: { id: entity.id } },
    );
  }

  async find(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
