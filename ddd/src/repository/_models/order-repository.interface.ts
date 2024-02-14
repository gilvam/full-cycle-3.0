import IRepository from './repository.interface';
import { Order } from '../../domain/entity/order';

export interface IOrderRepository extends IRepository<Order> {
  create(entity: Order): Promise<void>;

  update(entity: Order): Promise<void>;

  find(id: string): Promise<Order>;

  findAll(): Promise<Order[]>;
}
