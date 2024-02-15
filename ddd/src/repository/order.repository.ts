import { Order } from '@d-entity/order';
import { OrderItem } from '@d-entity/order-item';
import { ObjectUtils } from '@util/object.utils';
import OrderDb from '@infrastructure/db/sequelize/models/order.db';
import OrderItemDb from '@infrastructure/db/sequelize/models/order-item.db';
import { OrderRepositoryUtil } from '@r-utils/order-repository.util';
import { IOrderRepository } from '@r-models/order-repository.interface';

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

  async find(id: string): Promise<Order> {
    let response: OrderDb;

    try {
      response = await OrderDb.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: ['items'],
      });
    } catch (e) {
      throw new Error('Order not found');
    }

    return OrderRepositoryUtil.redoOrder(response);
  }

  async findAll(): Promise<Order[]> {
    let response: OrderDb[] | Order[];

    try {
      response = await OrderDb.findAll({ include: ['items'] });
    } catch (e) {
      throw new Error('Orders not found');
    }

    return OrderRepositoryUtil.redoOrderList(response);
  }

  async update(entity: Order): Promise<void> {
    const oldOrder = await this.find(entity.id);

    await this.checkItemsUpdate(entity, oldOrder);
    await this.checkItemsAdd(entity, oldOrder);
    await this.checkItemsDelete(entity, oldOrder);

    await OrderDb.update(
      {
        customerId: entity.customerId,
        total: entity.total(),
      },
      { where: { id: entity.id } },
    );
  }

  private async checkItemsUpdate(
    newOrder: Order,
    oldOrder: Order,
  ): Promise<void> {
    const itemsToChange = newOrder.items.filter((item) => oldOrder.items.find(
      (itemOld) => itemOld.id === item.id
          && ObjectUtils.notEquals<OrderItem>(item, itemOld),
    ));

    if (!itemsToChange.length) {
      return;
    }

    try {
      await Promise.all(
        newOrder.items.map(async (item) => {
          await OrderItemDb.update(
            {
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            },
            { where: { id: item.id } },
          );
        }),
      );
    } catch (e) {
      throw new Error('Error on update orderItems');
    }
  }

  private async checkItemsAdd(newOrder: Order, oldOrder: Order): Promise<void> {
    const itemsToAdd = newOrder.items.filter(
      (item) => !oldOrder.items.find((i) => i.id === item.id),
    );

    if (!itemsToAdd.length) {
      return;
    }

    try {
      await OrderItemDb.bulkCreate(
        itemsToAdd.map((item) => ({
          id: item.id,
          productId: item.productId,
          orderId: oldOrder.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      );
    } catch (e) {
      throw new Error('Error on add orderItems');
    }
  }

  private async checkItemsDelete(
    newOrder: Order,
    oldOrder: Order,
  ): Promise<void> {
    const itemsToDelete = oldOrder.items.filter(
      (item) => !newOrder.items.find((i) => i.id === item.id),
    );

    if (!itemsToDelete.length) {
      return;
    }

    await OrderItemDb.destroy({
      where: { id: itemsToDelete.map((item) => item.id) },
    });
  }
}
