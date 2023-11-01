import { IUbitsFilter } from '../utils';

export abstract class Repository<T> {
  abstract get(id: string, args?: any): Promise<T>;

  abstract set(value: T | T[], args?: any): Promise<any>;

  abstract update(value: T | T[], args?: any): Promise<any>;

  abstract delete(value: string | string[] | T | T[], args?: any): Promise<any>;

  abstract count(filter?: IUbitsFilter, args?: any): Promise<number>;

  abstract search(filter?: IUbitsFilter, args?: any): Promise<T[]>;

  abstract searchPaginator(
    filter?: IUbitsFilter,
    args?: any,
  ): Promise<{ data: T[]; count: number }>;

  abstract inputFormat(data: any, args?: any): T;

  abstract outputFormat(data: any, args?: any): any;
}
