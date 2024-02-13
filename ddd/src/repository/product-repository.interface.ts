import { Product } from '../domain/entity/product';
import IRepository from './repository.interface';

export class IProductRepository implements IRepository<Product> {
  create(entity: Product): Promise<void>;
  update(entity: Product): Promise<void>;
  find(entity: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
}
