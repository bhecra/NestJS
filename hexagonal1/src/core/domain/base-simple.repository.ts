import { IUbitsFilter } from '../utils';

export abstract class SimpleRepository<T, R, U> {
  abstract get(id?: string, args?: any): Promise<T>;

  abstract search(filter?: IUbitsFilter, args?: any): Promise<T[]>;

  abstract create(item: R, args?: any): Promise<any>;

  abstract update(item: U, args?: any): Promise<any>;

  abstract delete(id?: string | T, args?: any): Promise<any>;
}
