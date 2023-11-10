import { IUbitsFilter } from '../../utils';

export abstract class BaseRepository<T> {
  abstract get(id: string, args?: any): Promise<T>;

  abstract create(value: T | T[], args?: any): Promise<any>;

  abstract update(item: Partial<T>, args?: any): Promise<any>;

  abstract delete(value: string | string[] | T | T[], args?: any): Promise<any>;

  abstract count(filter?: IUbitsFilter, args?: any): Promise<number>;

  abstract search(filter?: IUbitsFilter, args?: any): Promise<T[]>;

  abstract inputFormat(data: any, args?: any): T;

  abstract outputFormat(data: any, args?: any): any;
}
