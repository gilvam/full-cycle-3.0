import IEvent from '@d-event/_shared/event.interface';

export default interface IEventHandler<T extends IEvent = IEvent> {
	handle(event: T): void;
}
