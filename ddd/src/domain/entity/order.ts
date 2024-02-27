import { OrderItem } from '@d-entity/order-item';
import { IOrder } from '@d-entity/order.interface';

export class Order implements IOrder {
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

	get id(): string {
		return this._id;
	}

	get customerId(): string {
		return this._customerId;
	}

	get items(): OrderItem[] {
		return this._items;
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

	updateItem(item: OrderItem): void {
		this._items = this._items.map((i) => (i.id === item.id ? item : i));
		this.updateTotal();
	}

	addItem(item: OrderItem): void {
		this._items.push(item);
		this.updateTotal();
	}

	removeItem(id: string): void {
		this._items = this._items.filter((item) => item.id !== id);
		this.updateTotal();
	}

	private updateTotal(): void {
		this._total = this.total();
	}
}
