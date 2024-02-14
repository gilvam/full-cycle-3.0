import { Sequelize } from 'sequelize-typescript';
import OrderDb from '../infrastructure/db/sequelize/models/order.db';
import CustomerDb from '../infrastructure/db/sequelize/models/customer.db';
import { OrderItem } from '../domain/entity/order-item';
import OrderItemDb from '../infrastructure/db/sequelize/models/order-item.db';
import ProductDb from '../infrastructure/db/sequelize/models/product.db';
import OrderRepository from './order.repository';
import { Address } from '../domain/entity/address';
import { Customer } from '../domain/entity/customer';
import CustomerRepository from './customer.repository';
import ProductRepository from './product.repository';
import { Product } from '../domain/entity/product';
import { Order } from '../domain/entity/order';

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

    const orderItem = new OrderItem('1', product.name, product.price, 2, product.id);
    const order = new Order('1', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();

    // Act
    await customerRepository.create(customer);
    await productRepository.create(product);
    await orderRepository.create(order);
    const foundOrder = await OrderDb.findOne({ where: { id: order.id }, include: ['items'] });

    // Assert
    expect(foundOrder?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          productId: orderItem.productId,
          orderId: order.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
        },
      ],
    });
  });

  it('should update a order', async () => {
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const product = new Product('1', 'Product 1', 10);
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const orderItem = new OrderItem('1', product.name, product.price, 2, product.id);
    const order = new Order('1', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    orderItem.changePrice(20);

    const foundOrder = await OrderDb.findOne({ where: { id: order.id }, include: ['items'] });

    expect(foundOrder?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          productId: orderItem.productId,
          orderId: order.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
        },
      ],
    });
  });
});
