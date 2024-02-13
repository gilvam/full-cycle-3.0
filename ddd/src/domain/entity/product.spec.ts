import { Product } from './product';

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    const throwError = () => new Product('', 'product 1', 100);

    expect(throwError).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    const throwError = () => new Product('1', '', 100);

    expect(throwError).toThrow('Name is required');
  });

  it('should throw error when price is empty', () => {
    const throwError = () => new Product('1', 'product 1', 0);

    expect(throwError).toThrow('Price is required');
  });

  it('should change name', () => {
    const product = new Product('1', 'product 1', 100);
    const spy = jest.spyOn(product, 'changeName');

    product.changeName('product 2');

    expect(spy).toHaveBeenCalledWith('product 2');
  });

  it('should change price', () => {
    const product = new Product('1', 'product 1', 100);
    const spy = jest.spyOn(product, 'changePrice');

    product.changePrice(200);

    expect(spy).toHaveBeenCalledWith(200);
  });
});
