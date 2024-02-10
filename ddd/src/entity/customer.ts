import { Address } from './address';
import { AddressEmpty } from './util/address-empty';

export class Customer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active = false;
  private _rewardsPoints = 0;

  constructor(id: string, name: string, address: Address = AddressEmpty.build()) {
    this._id = id;
    this._name = name;
    this._address = address;
    this.validate();
  }

  private validate(): void {
    if (!this._name) {
      throw new Error('Name is required');
    }
    if (!this._id) {
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

  get isActivated(): boolean {
    return this._active;
  }

  addAddress(address: Address) {
    this._address = address;
  }

  get name(): string {
    return this._name;
  }

  get rewardsPoints(): number {
    return this._rewardsPoints;
  }

  addRewardsPoints(points: number) {
    this._rewardsPoints += points;
  }
}
