import IRepository from './repository.interface';
import { Customer } from '../../domain/entity/customer';

export interface ICustomerRepository extends IRepository<Customer> {
  create(entity: Customer): Promise<void>;

  find(id: string): Promise<Customer>;

  findAll(): Promise<Customer[]>;

  update(entity: Customer): Promise<void>;
}
