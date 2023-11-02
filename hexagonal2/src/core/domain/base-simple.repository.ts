import { IUbitsFilter } from '../utils';

export abstract class SimpleRepository<T> {
  abstract get(id?: string, args?: any): Promise<T>;

  abstract search(filter?: IUbitsFilter, args?: any): Promise<T[]>;

  abstract create(item: T, args?: any): Promise<any>;

  abstract update(item: Partial<T>, args?: any): Promise<any>;

  abstract delete(id?: string | T, args?: any): Promise<any>;
}
