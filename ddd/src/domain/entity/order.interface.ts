import { IOrderItem } from './order-item.interface';

export interface IOrder {
  get id(): string;

  get customerId(): string;

  get items(): IOrderItem[];
}
