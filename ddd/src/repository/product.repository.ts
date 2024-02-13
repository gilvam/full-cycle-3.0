import { Product } from '../domain/entity/product';
import { IProductRepository } from './_models/product-repository.interface';
import ProductDb from '../infrastructure/db/sequelize/models/product.db';

export default class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    await ProductDb.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductDb.update(
      { name: entity.name, price: entity.price },
      { where: { id: entity.id } },
    );
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductDb.findOne({ where: { id } });

    if (!productModel) {
      throw new Error('Product not found');
    }
    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductDb.findAll();
    return productModels.map(
      (productModel) => new Product(productModel.id, productModel.name, productModel.price),
    );
  }
}
