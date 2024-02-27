import { Address } from '@d-entity/address';

export class AddressEmpty {
	static build() {
		return new Address('', 0, '', '');
	}
}
