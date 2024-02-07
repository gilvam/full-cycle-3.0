import { Address } from './address';

class Customer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active = false;

  constructor(id: string, name: string, address: Address) {
    this._id = id;
    this._name = name;
    this._address = address;
    this.validate();
  }

  private validate(): void {
    if (!this._name.length) {
      throw new Error('Name is required');
    }
    if (!this._id.length) {
      throw new Error('Id is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address.isInvalid()) {
      throw new Error('Address is mandatory to activate a custimer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
