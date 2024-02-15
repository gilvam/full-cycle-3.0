import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import OrderDb from '@infrastructure/db/sequelize/models/order.db';
import ProductDb from '@infrastructure/db/sequelize/models/product.db';

@Table({ tableName: 'order_items', timestamps: false })
export default class OrderItemDb extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  declare id: string;

  @ForeignKey(() => ProductDb)
  @Column({ type: DataType.STRING, allowNull: false })
  declare productId: string;

  @BelongsTo(() => ProductDb)
  declare product: ProductDb;

  @ForeignKey(() => OrderDb)
  @Column({ type: DataType.STRING, allowNull: false })
  declare orderId: string;

  @BelongsTo(() => OrderDb)
  declare order: ProductDb;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  declare price: number;

  @Column({ type: DataType.NUMBER, allowNull: false })
  declare quantity: number;
}
