import { Address } from '../address';

export class AddressEmpty {
  static build() {
    return new Address('', 0, '', '');
  }
}
