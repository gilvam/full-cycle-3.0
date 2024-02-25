import IEventDispatcher from '@d-event/_shared/event-dispatcher.interface';
import IEventHandler from '@d-event/_shared/event-handler.interface';
import IEvent from '@d-event/_shared/event.interface';
import { ArrayUtils } from '@util/array.utils';

export default class EventDispatcher implements IEventDispatcher {
	private _eventHandlers: Map<string, IEventHandler<IEvent>[]> = new Map();

	getEventHandlers(eventName: string): IEventHandler<IEvent>[] {
		return this._eventHandlers.get(eventName) ?? [];
	}

	notify(event: IEvent): void {
		const eventName = Object.getPrototypeOf(event).constructor.name;

		if (this._eventHandlers.has(eventName)) {
			this._eventHandlers.get(eventName)?.forEach((eventHandler) => eventHandler.handle(event));
		}
	}

	register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
		if (!this._eventHandlers.has(eventName)) {
			this._eventHandlers.set(eventName, []);
		}

		this._eventHandlers.get(eventName)?.push(eventHandler);
	}

	unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
		if (this._eventHandlers.has(eventName)) {
			const index = this._eventHandlers.get(eventName)?.indexOf(eventHandler) ?? -1;

			if (!ArrayUtils.hasIndex(index)) {
				return;
			}

			this._eventHandlers.get(eventName)?.splice(index, 1);
		}
	}

	unregisterAll(): void {
		this._eventHandlers.clear();
	}
}
