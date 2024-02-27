import IEventHandler from '@d-event/_shared/model/event-handler.interface';
import IEvent from '@d-event/_shared/model/event.interface';

export default interface IEventDispatcher {
	notify(event: IEvent): void;

	register(eventName: string, eventHandler: IEventHandler): void;

	unregister(eventName: string, eventHandler: IEventHandler): void;

	unregisterAll(): void;
}
