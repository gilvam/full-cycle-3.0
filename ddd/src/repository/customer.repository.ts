import { Customer } from '@d-entity/customer';
import { Address } from '@d-entity/address';
import CustomerDb from '@infrastructure/db/sequelize/models/customer.db';
import { ICustomerRepository } from '@r-models/customer-repository.interface';

export default class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer): Promise<void> {
    await CustomerDb.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipCode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActivated,
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerDb.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipCode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActivated,
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } },
    );
  }

  async find(id: string): Promise<Customer> {
    let response: CustomerDb;

    try {
      response = await CustomerDb.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (e) {
      throw new Error('Customer not found');
    }

    const customer = new Customer(id, response.name);
    const address = new Address(
      response.street,
      response.number,
      response.zipCode,
      response.city,
    );
    customer.addAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const productList = await CustomerDb.findAll();
    return productList.map((it) => {
      const address = new Address(it.street, it.number, it.zipCode, it.city);
      return new Customer(it.id, it.name, address);
    });
  }
}
