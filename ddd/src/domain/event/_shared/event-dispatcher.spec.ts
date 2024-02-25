import { Product } from '@d-entity/product';
import EventDispatcher from '@d-event/_shared/event-dispatcher';
import SendEmailWhenProductIsCreatedHandler from '@d-event/product/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '@d-event/product/product-created.event';

describe('Domain events tests', () => {
	it('should register an event handler', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		const eventName = 'ProductCreatedEvent';

		eventDispatcher.register(eventName, eventHandler);

		expect(eventDispatcher.getEventHandlers(eventName)).toBeDefined();
		expect(eventDispatcher.getEventHandlers(eventName).length).toBe(1);
		expect(eventDispatcher.getEventHandlers(eventName)).toContain(eventHandler);
		expect(eventDispatcher.getEventHandlers(eventName)).toMatchObject(eventHandler);
	});

	it('should unregister an event handler', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		const eventName = 'ProductCreatedEvent';

		eventDispatcher.register(eventName, eventHandler);
		eventDispatcher.unregister(eventName, eventHandler);

		expect(eventDispatcher.getEventHandlers(eventName)).toBeDefined();
		expect(eventDispatcher.getEventHandlers(eventName).length).toBe(0);
	});

	it('should unregister all event handlers', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		const eventName = 'ProductCreatedEvent';

		eventDispatcher.register(eventName, eventHandler);
		eventDispatcher.unregisterAll();

		expect(eventDispatcher).toBeDefined();
		expect(eventDispatcher.getEventHandlers(eventName)).not.toContain(eventHandler);
		expect(eventDispatcher.getEventHandlers(eventName).length).toBe(0);
	});

	it('should notify all event handlers', () => {
		// Arrange
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		const eventName = 'ProductCreatedEvent';

		const product = new Product('1', 'Product 1', 100);
		const productCreatedEvent = new ProductCreatedEvent(product);

		const spyEventHandler = jest.spyOn(eventHandler, 'handle');

		// Act
		eventDispatcher.register(eventName, eventHandler);
		eventDispatcher.notify(productCreatedEvent);

		// Assert
		expect(spyEventHandler).toHaveBeenCalled();
	});
});
