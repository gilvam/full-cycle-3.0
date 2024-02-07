export class Address {
  private _street: string;
  private _number: number;
  private _zip: string;
  private _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  validate(): void {
    if (!this._street.length) {
      throw new Error('Street is required');
    }
    if (!this._zip.length) {
      throw new Error('Zip is required');
    }
    if (!this._city.length) {
      throw new Error('City is required');
    }
  }

  isValid(): boolean {
    return !!(this._street.length && this._zip.length && this._city.length);
  }

  isInvalid(): boolean {
    return !this.isValid();
  }
}
