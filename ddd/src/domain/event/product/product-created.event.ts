import IEvent from '@d-event/_shared/event.interface';

export default class ProductCreatedEvent implements IEvent {
	dateTimeOccurred: Date;
	eventData: unknown;

	constructor(eventData: unknown) {
		this.dateTimeOccurred = new Date();
		this.eventData = eventData;
	}
}
