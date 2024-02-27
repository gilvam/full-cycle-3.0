import { Product } from '@d-entity/product';
import EventDispatcher from '@d-event/_shared/event-dispatcher';
import SendEmailWhenProductIsCreatedHandler from '@d-event/product/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '@d-event/product/product-created.event';

describe('Product created events based on event-dispatcher class tests', () => {
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
