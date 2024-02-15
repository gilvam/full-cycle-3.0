import { IOrderItem } from '@d-entity/order-item.interface';

export interface IOrder {
  get id(): string;

  get customerId(): string;

  get items(): IOrderItem[];
}
