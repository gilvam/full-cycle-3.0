import { Address } from '@d-entity/address';
import { Customer } from '@d-entity/customer';
import EventDispatcher from '@d-event/_shared/event-dispatcher';
import CustomerCreatedEvent from '@d-event/customer/customer-created.event';
import SendConsoleLogWhenCustomerIsCreatedHandler from '@d-event/customer/handler/send-console-log-when-customer-is-created.handler';
import SendConsoleLogWhenCustomerIsCreated2Handler from '@d-event/customer/handler/send-console-log-when-customer-is-created2.handler';

describe('Customer created events based on event-dispatcher class tests', () => {
	it('should created two customers event and notify', () => {
		// Arrange
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendConsoleLogWhenCustomerIsCreatedHandler();
		const eventHandler2 = new SendConsoleLogWhenCustomerIsCreated2Handler();
		const eventName = 'CustomerCreatedEvent';

		const address = new Address('Rua dois', 2, '12345-678', 'São Paulo');
		const customer = new Customer('123', 'Geraldo', address);

		const customerCreatedEvent = new CustomerCreatedEvent(customer);
		const spyEventHandler = jest.spyOn(eventHandler, 'handle');
		const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

		// Act
		eventDispatcher.register(eventName, eventHandler);
		eventDispatcher.register(eventName, eventHandler2);
		eventDispatcher.notify(customerCreatedEvent);

		// Assert
		expect(customerCreatedEvent.data).toEqual(customer);
		expect(spyEventHandler).toHaveBeenCalledWith(customerCreatedEvent);
		expect(spyEventHandler2).toHaveBeenCalledWith(customerCreatedEvent);
	});
});
