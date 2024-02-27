import { Address } from '@d-entity/address';
import { AddressEmpty } from '@d-entity/util/address-empty';

export class Customer {
	private _id: string;
	private _name: string;
	private _address: Address;
	private _active = false;
	private _rewardPoints = 0;

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

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get address(): Address {
		return this._address;
	}

	get isActivated(): boolean {
		return this._active;
	}

	get rewardPoints(): number {
		return this._rewardPoints;
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

	addAddress(address: Address) {
		this._address = address;
	}

	addRewardPoints(points: number) {
		this._rewardPoints += points;
	}
}
