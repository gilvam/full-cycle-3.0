import { Product } from '@d-entity/product';
import { IProductRepository } from '@d-repository/_models/product-repository.interface';
import ProductDb from '@infrastructure/db/sequelize/models/product.db';

export default class ProductRepository implements IProductRepository {
	async create(entity: Product): Promise<void> {
		await ProductDb.create({
			id: entity.id,
			name: entity.name,
			price: entity.price
		});
	}

	async update(entity: Product): Promise<void> {
		await ProductDb.update({ name: entity.name, price: entity.price }, { where: { id: entity.id } });
	}

	async find(id: string): Promise<Product> {
		let product: ProductDb;

		try {
			product = await ProductDb.findOne({ where: { id }, rejectOnEmpty: true });
		} catch (e) {
			throw new Error('Product not found');
		}

		return new Product(product.id, product.name, product.price);
	}

	async findAll(): Promise<Product[]> {
		const productList = await ProductDb.findAll();
		return productList.map((productModel) => new Product(productModel.id, productModel.name, productModel.price));
	}
}
