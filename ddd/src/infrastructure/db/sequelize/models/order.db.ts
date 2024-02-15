import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import CustomerDb from '@infrastructure/db/sequelize/models/customer.db';
import OrderItemDb from '@infrastructure/db/sequelize/models/order-item.db';

@Table({ tableName: 'orders', timestamps: false })
export default class OrderDb extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  declare id: string;

  @ForeignKey(() => CustomerDb)
  @Column({ type: DataType.STRING, allowNull: false })
  declare customerId: string;

  @BelongsTo(() => CustomerDb)
  declare customer: CustomerDb;

  @HasMany(() => OrderItemDb)
  declare items: OrderItemDb[];

  @Column({ type: DataType.NUMBER, allowNull: false })
  declare total: number;
}
