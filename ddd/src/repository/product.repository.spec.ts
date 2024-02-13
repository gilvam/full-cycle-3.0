import { Sequelize } from 'sequelize-typescript';
import { Product } from '../domain/entity/product';
import ProductRepository from './product.repository';
import ProductDb from '../infrastructure/db/sequelize/models/product.db';

describe('Product repository unit tests', () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequileze.addModels([ProductDb]);
    await sequileze.sync();
  });
  afterEach(async () => {
    await sequileze.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);
    const foundProduct = await ProductDb.findOne({ where: { id: product.id } });

    expect(foundProduct?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);
    let foundProduct = await ProductDb.findOne({ where: { id: product.id } });
    product.changeName('Product 2');
    product.changePrice(200);
    await productRepository.update(product);
    foundProduct = await ProductDb.findOne({ where: { id: product.id } });

    expect(foundProduct?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);
    const productModel = await ProductDb.findOne({ where: { id: product.id } });
    const foundProduct = await productRepository.find(product.id);

    expect(productModel?.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    expect(foundProduct).toStrictEqual(product);
  });

  it('should throw error when product not found', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);
    const throwError = () => productRepository.find('2');

    await expect(throwError).rejects.toThrow('Product not found');
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product('1', 'Product 1', 100);
    const product2 = new Product('2', 'Product 2', 200);

    await productRepository.create(product1);
    await productRepository.create(product2);
    const foundProducts = await productRepository.findAll();

    expect(foundProducts).toHaveLength(2);
    expect(foundProducts).toContainEqual(product1);
    expect(foundProducts).toContainEqual(product2);
    expect([product1, product2]).toEqual(foundProducts);
  });
});
