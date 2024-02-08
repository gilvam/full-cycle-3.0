import { OrderItem } from './order-item';

export class Order {
  private _id: string;
  private _customerId: string; // # diferentes agregados: relação por ID
  private _items: OrderItem[] = []; // # mesmo agregado: relação pela classe
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validate();
  }

  validate(): void {
    if (!this._id) {
      throw new Error('Id is required');
    }
    if (!this._customerId) {
      throw new Error('CustomerId is required');
    }
    if (!this._items.length) {
      throw new Error('Items are required');
    }
  }

  total(): number {
    return this._items.reduce((total, item) => total + item.total(), 0);
  }
}
