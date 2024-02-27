import IEventHandler from '@d-event/_shared/model/event-handler.interface';
import CustomerCreatedEvent from '@d-event/customer/customer-created.event';

export default class SendConsoleLogWhenCustomerIsCreated2Handler implements IEventHandler<CustomerCreatedEvent> {
	handle(event: CustomerCreatedEvent): void {
		console.log('Esse é o segundo console.log do evento: CustomerCreated. Id:', event.data.id);
	}
}
