import { Sequelize } from 'sequelize-typescript';
import CustomerDb from '../infrastructure/db/sequelize/models/customer.db';
import CustomerRepository from './customer.repository';
import { Customer } from '../domain/entity/customer';
import { Address } from '../domain/entity/address';

describe('Customer repository unit tests', () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequileze.addModels([CustomerDb]);
    await sequileze.sync();
  });
  afterEach(async () => {
    await sequileze.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);

    await customerRepository.create(customer);
    const foundCustomer = await CustomerDb.findOne({ where: { id: customer.id } });

    expect(foundCustomer?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      zipCode: address.zip,
      city: address.city,
      active: customer.isActivated,
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);

    await customerRepository.create(customer);
    customer.changeName('Customer 2');
    await customerRepository.update(customer);

    const foundCustomerChanges = await CustomerDb.findOne({ where: { id: customer.id } });

    expect(foundCustomerChanges?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: address.street,
      number: address.number,
      zipCode: address.zip,
      city: address.city,
      active: customer.isActivated,
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);

    await customerRepository.create(customer);
    const foundCustomer = await customerRepository.find(customer.id);

    expect(foundCustomer).toStrictEqual(customer);
  });

  it('should throw error when customer not found', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer = new Customer('1', 'Customer 1', address);

    await customerRepository.create(customer);
    const throwError = () => customerRepository.find('2');

    await expect(throwError).rejects.toThrow('Customer not found');
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('Cols Street', 1, '123', 'city');
    const customer1 = new Customer('1', 'Customer 1', address);
    const customer2 = new Customer('2', 'Customer 2', address);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);
    const foundCustomers = await customerRepository.findAll();

    expect(foundCustomers).toHaveLength(2);
    expect(foundCustomers).toContainEqual(customer1);
    expect(foundCustomers).toContainEqual(customer2);
    expect([customer1, customer2]).toEqual(foundCustomers);
  });
});
