import { Customer } from '@d-entity/customer';
import Event from '@d-event/_shared/model/event.model';

export default class CustomerChangedEvent extends Event<Customer> {}
