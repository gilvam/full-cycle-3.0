import IEventHandler from '@d-event/_shared/event-handler.interface';
import ProductCreatedEvent from '@d-event/product/product-created.event';

export default class SendEmailWhenProductIsCreatedHandler implements IEventHandler<ProductCreatedEvent> {
	handle(event: ProductCreatedEvent): void {
		console.log('sending email too...', event);
	}
}
