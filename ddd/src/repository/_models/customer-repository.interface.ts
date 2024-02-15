import { Customer } from '@d-entity/customer';
import IRepository from '@r-models/repository.interface';

export interface ICustomerRepository extends IRepository<Customer> {
  create(entity: Customer): Promise<void>;

  find(id: string): Promise<Customer>;

  findAll(): Promise<Customer[]>;

  update(entity: Customer): Promise<void>;
}
