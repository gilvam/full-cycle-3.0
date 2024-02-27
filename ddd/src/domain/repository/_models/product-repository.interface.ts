import { Product } from '@d-entity/product';
import IRepository from '@d-repository/_models/repository.interface';

export interface IProductRepository extends IRepository<Product> {
	create(entity: Product): Promise<void>;

	find(id: string): Promise<Product>;

	findAll(): Promise<Product[]>;

	update(entity: Product): Promise<void>;
}
