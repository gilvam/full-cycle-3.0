import IEventHandler from '@d-event/_shared/model/event-handler.interface';
import CustomerChangedEvent from '@d-event/customer/customer-changed.event';

export default class SendConsoleLogWhenCustomerIsChangedHandler implements IEventHandler<CustomerChangedEvent> {
	handle(event: CustomerChangedEvent): void {
		const data = event.data;
		const addr = data.address;
		const addressSimple = `${addr.street}, ${addr.number} - ${addr.zip} - ${addr.city}`;

		console.log(`Endereço do cliente: ${data.id}, ${data.name} alterado para: ${addressSimple}`);
	}
}
