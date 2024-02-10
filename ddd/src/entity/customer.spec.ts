import { Customer } from './customer';
import { Address } from './address';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    const address = new Address('Rua dois', 2, '12345-678', 'São Paulo');

    const throwError = () => new Customer('', 'Geraldo', address);

    expect(throwError).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    const address = new Address('Rua dois', 2, '12345-678', 'São Paulo');

    const throwError = () => new Customer('123', '', address);

    expect(throwError).toThrowError('Name is required');
  });

  it('should change name', () => {
    const customer = new Customer('123', 'Geraldo');

    customer.changeName('Jane');

    expect(customer.name).toBe('Jane');
  });

  it('should activate customer', () => {
    const address = new Address('Rua dois', 2, '12345-678', 'São Paulo');
    const customer = new Customer('123', 'Geraldo', address);

    customer.activate();

    expect(customer.isActivated).toBeTruthy();
  });

  it('should deactivate customer', () => {
    const address = new Address('Rua dois', 2, '12345-678', 'São Paulo');
    const customer = new Customer('123', 'Geraldo', address);

    customer.deactivate();

    expect(customer.isActivated).toBeFalsy();
  });

  it('should add address is called with spy', () => {
    const customer = new Customer('123', 'Geraldo');
    const address = new Address('Rua dois', 2, '12345-678', 'São Paulo');
    const spy = jest.spyOn(customer, 'addAddress');

    customer.addAddress(address);
    customer.activate();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(address);
  });

  it('should throw error when address is empty', () => {
    const customer = new Customer('123', 'Geraldo');

    expect(() => {
      customer.activate();
    }).toThrowError('Address is mandatory to activate a custimer');
  });

  it('should add rewards points', () => {
    const address = new Address('Rua dois', 2, '12345-678', 'São Paulo');
    const customer = new Customer('123', 'Geraldo', address);
    const spy = jest.spyOn(customer, 'addRewardsPoints');
    const points = 10;

    customer.addRewardsPoints(points);

    expect(customer.rewardsPoints).toBe(points);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(points);
  });
});
