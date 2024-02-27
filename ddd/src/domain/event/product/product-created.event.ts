import { Product } from '@d-entity/product';
import Event from '@d-event/_shared/model/event.model';

export default class ProductCreatedEvent extends Event<Product> {}
