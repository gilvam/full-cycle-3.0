import { Sequelize } from 'sequelize-typescript';
import CustomerDb from '@infrastructure/db/sequelize/models/customer.db';
import OrderDb from '@infrastructure/db/sequelize/models/order.db';
import OrderItemDb from '@infrastructure/db/sequelize/models/order-item.db';
import ProductDb from '@infrastructure/db/sequelize/models/product.db';
import { Address } from '@d-entity/address';
import { Customer } from '@d-entity/customer';
import { Product } from '@d-entity/product';
import { Order } from '@d-entity/order';
import ProductRepository from '@repository/product.repository';
import { OrderItem } from '@d-entity/order-item';
import CustomerRepository from '@repository/customer.repository';
import OrderRepository from '@repository/order.repository';

describe('Order repository unit tests', () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequileze.addModels([CustomerDb, OrderDb, OrderItemDb, ProductDb]);
    await sequileze.sync();
  });
  afterEach(async () => {
    await sequileze.close();
  });

  it('should create a order', async () => {
    // Arrange
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);
    const customerRepository = new CustomerRepository();

    const product = new Product('1', 'Product 1', 10);
    const productRepository = new ProductRepository();

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id,
    );
    const order = new Order('1', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();

    // Act
    await customerRepository.create(customer);
    await productRepository.create(product);
    await orderRepository.create(order);
    const foundOrder = await orderRepository.find(order.id);

    // Assert
    expect(foundOrder).toStrictEqual(order);
  });

  it('should find a order', async () => {
    // Arrange
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);
    const customerRepository = new CustomerRepository();

    const product = new Product('1', 'Product 1', 10);
    const productRepository = new ProductRepository();

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id,
    );
    const order = new Order('1', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();

    // Act
    await customerRepository.create(customer);
    await productRepository.create(product);
    await orderRepository.create(order);
    const foundOrder = await orderRepository.find(order.id);

    // Assert
    expect(foundOrder).toStrictEqual(order);
  });

  it('should throw error when order not found', async () => {
    // Arrange
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);
    const customerRepository = new CustomerRepository();

    const product = new Product('1', 'Product 1', 10);
    const productRepository = new ProductRepository();

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id,
    );
    const order = new Order('1', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();

    // Act
    await customerRepository.create(customer);
    await productRepository.create(product);
    await orderRepository.create(order);
    const throwError = () => orderRepository.find('2');

    // Assert
    await expect(throwError).rejects.toThrow('Order not found');
  });

  it('should find all orders', async () => {
    // Arrange
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);
    const customerRepository = new CustomerRepository();

    const product = new Product('1', 'Product 1', 10);
    const product2 = new Product('2', 'Product 2', 20);
    const productRepository = new ProductRepository();

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id,
    );
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      4,
      product2.id,
    );
    const orderItem3 = new OrderItem(
      '3',
      product2.name,
      product2.price,
      1,
      product2.id,
    );
    const order = new Order('1', customer.id, [orderItem]);
    const order2 = new Order('2', customer.id, [orderItem2, orderItem3]);
    const orderRepository = new OrderRepository();

    // Act
    await customerRepository.create(customer);
    await productRepository.create(product);
    await productRepository.create(product2);
    await orderRepository.create(order);
    await orderRepository.create(order2);
    const foundOrders = await orderRepository.findAll();

    // Assert
    expect(foundOrders).toStrictEqual([order, order2]);
  });

  it('should update a order: change item', async () => {
    // Arrange
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);
    const customerRepository = new CustomerRepository();

    const product = new Product('1', 'Product 1', 10);
    const productRepository = new ProductRepository();

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id,
    );
    const order = new Order('1', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();

    // Act
    await customerRepository.create(customer);
    await productRepository.create(product);
    await orderRepository.create(order);
    orderItem.changePrice(20);
    order.updateItem(orderItem);
    await orderRepository.update(order);
    const foundOrder = await orderRepository.find(order.id);

    // Assert
    expect(foundOrder?.items.at(0)?.price).toBe(20);
    expect(foundOrder).toStrictEqual(order);
  });

  it('should update a order: new item', async () => {
    // Arrange
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);
    const customerRepository = new CustomerRepository();

    const product = new Product('1', 'Product 1', 10);
    const product2 = new Product('2', 'Product 2', 30);
    const productRepository = new ProductRepository();

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id,
    );
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      3,
      product.id,
    );
    const order = new Order('1', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();

    // Act
    await customerRepository.create(customer);
    await productRepository.create(product);
    await productRepository.create(product2);
    await orderRepository.create(order);
    order.addItem(orderItem2);
    await orderRepository.update(order);
    const foundOrder = await orderRepository.find(order.id);

    // Assert
    expect(foundOrder?.items.length).toBe(2);
    expect(foundOrder).toStrictEqual(order);
  });

  it('should update a order: delete item', async () => {
    // Arrange
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);
    const customerRepository = new CustomerRepository();

    const product = new Product('1', 'Product 1', 10);
    const product2 = new Product('2', 'Product 2', 20);
    const productRepository = new ProductRepository();

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      1,
      product.id,
    );
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      2,
      product2.id,
    );
    const order = new Order('1', customer.id, [orderItem, orderItem2]);
    const orderRepository = new OrderRepository();

    // Act
    await customerRepository.create(customer);
    await productRepository.create(product);
    await productRepository.create(product2);
    await orderRepository.create(order);
    order.removeItem(orderItem2.id);
    await orderRepository.update(order);
    const foundOrder = await orderRepository.find(order.id);

    // Assert
    expect(foundOrder?.items.length).toBe(1);
    expect(foundOrder).toStrictEqual(order);
  });
});
