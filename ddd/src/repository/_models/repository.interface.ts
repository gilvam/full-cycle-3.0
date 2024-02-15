export default interface IRepository<T> {
  create(entity: T): Promise<void>;

  find(id: string): Promise<T>;

  findAll(): Promise<T[]>;

  update(entity: T): Promise<void>;
}
