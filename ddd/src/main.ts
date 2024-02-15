import { Customer } from '@d-entity/customer';
import { Address } from '@d-entity/address';
import { OrderItem } from '@d-entity/order-item';
import { Order } from '@d-entity/order';

const customer = new Customer('123', 'Geraldo da Silva');
const address = new Address('Rua dois', 2, '12345-678', 'São Paulo');
customer.addAddress(address);
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10, 2, 'p1');
const item2 = new OrderItem('2', 'Item 2', 15, 1, 'p2');

const order = new Order('1', '123', [item1, item2]);

console.log('customer: ', customer);
console.log('order: ', order);
