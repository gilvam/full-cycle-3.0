import { Address } from '@d-entity/address';
import { Customer } from '@d-entity/customer';
import EventDispatcher from '@d-event/_shared/event-dispatcher';
import CustomerChangedEvent from '@d-event/customer/customer-changed.event';
import SendConsoleLogWhenCustomerIsChangedHandler from '@d-event/customer/handler/send-console-log-when-customer-is-changed.handler';

describe('Customer changed events based on event-dispatcher class tests', () => {
	it('should changed customer event and notify', () => {
		// Arrange
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendConsoleLogWhenCustomerIsChangedHandler();
		const eventName = 'CustomerChangedEvent';

		const address = new Address('Rua dois', 2, '12345-678', 'São Paulo');
		const customer = new Customer('123', 'Geraldo', address);

		const customerChangedEvent = new CustomerChangedEvent(customer);
		const spyEventHandler = jest.spyOn(eventHandler, 'handle');

		const addressChanged = new Address('Rua três', 3, '12345-673', 'Minas Gerais');
		customer.addAddress(addressChanged);

		// Act
		eventDispatcher.register(eventName, eventHandler);
		eventDispatcher.notify(customerChangedEvent);

		// Assert
		expect(customerChangedEvent.data).toEqual(customer);
		expect(spyEventHandler).toHaveBeenCalledWith(customerChangedEvent);
	});
});
