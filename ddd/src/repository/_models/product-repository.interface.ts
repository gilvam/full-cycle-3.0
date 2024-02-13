import { Product } from '../../domain/entity/product';
import IRepository from './repository.interface';

export interface IProductRepository extends IRepository<Product> {
  create(entity: Product): Promise<void>;

  update(entity: Product): Promise<void>;

  find(id: string): Promise<Product>;

  findAll(): Promise<Product[]>;
}
