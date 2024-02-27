import IEvent from '@d-event/_shared/model/event.interface';

export default class Event<T> implements IEvent {
	dateTimeOccurred: Date;
	data: T;

	constructor(data: T) {
		this.dateTimeOccurred = new Date();
		this.data = data;
	}
}
