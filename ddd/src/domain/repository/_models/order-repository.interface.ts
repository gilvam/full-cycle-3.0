import { Order } from '@d-entity/order';
import IRepository from '@d-repository/_models/repository.interface';

export interface IOrderRepository extends IRepository<Order> {
	create(entity: Order): Promise<void>;

	find(id: string): Promise<Order>;

	findAll(): Promise<Order[]>;

	update(entity: Order): Promise<void>;
}
