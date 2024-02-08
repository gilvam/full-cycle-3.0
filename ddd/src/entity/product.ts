export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  validate(): void {
    if (!this._id) {
      throw new Error('Id is required');
    }
    if (!this._name) {
      throw new Error('Name is required');
    }
    if (!this._price) {
      throw new Error('Price is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}
