import { v4 as uuid } from 'uuid';
import { BaseRepository } from './base.repository';
import {
  FilterLogicalOperatorEnum,
  IUbitsFilter,
  IUbitsFilterArgs,
  filterObject,
  sortObjects,
} from 'src/core/utils';

export class MemoryRepository<T> implements BaseRepository<T> {
  public items = new Map();

  constructor(items: T[]) {
    for (const item of items) this.create(item).then();
  }

  async get(id: string): Promise<T> {
    const item = this.items.get(id) || {};
    return Promise.resolve(this.inputFormat(item));
  }

  async create(value: T | T[]): Promise<void> {
    if (!value) return;

    const items: T[] = Array.isArray(value) ? value : [value];

    for (const item of items) {
      item['id'] = item['id'] || uuid();
      this.items.set(item['id'], item);
    }
  }

  async update(value: T): Promise<void> {
    await this.create(value);
  }

  async delete(value: string | string[] | T | T[]): Promise<void> {
    if (!value) return;

    const ids = Array.isArray(value) ? value : [value];

    for (const item of ids) {
      if (typeof item === 'string') {
        this.items.delete(item);
      } else if (typeof item === 'object' && item['id']) {
        this.items.delete(item['id']);
      }
    }
  }

  async count(filter?: IUbitsFilter): Promise<number> {
    const data = (await this.search(filter)) || [];
    return Promise.resolve(data.length);
  }

  async search(filter?: IUbitsFilter): Promise<T[]> {
    const args = this.getArgsFilterSearch(filter?.args ? filter : null);
    const order = filter ? filter.order : null;
    const logicalOperator = filter?.logicalOperator
      ? filter.logicalOperator
      : FilterLogicalOperatorEnum.AND;
    const data: T[] = [];
    this.items.forEach((item) => data.push(this.inputFormat(item)));
    let currentItems = args ? filterObject(logicalOperator, data, args) : data;

    if (order) {
      const key = filter.order.key;
      const sort = filter.order.sort;
      currentItems = sortObjects(key, currentItems, sort);
    }

    currentItems = this.sliceData(filter, currentItems);

    return Promise.resolve(currentItems || []);
  }

  protected getArgsFilterSearch(filter: IUbitsFilter): IUbitsFilterArgs {
    return filter ? filter.args : null;
  }

  inputFormat(data: any): T {
    return data;
  }

  outputFormat(data: any): any {
    return data;
  }

  sliceData(filter: IUbitsFilter, data): any[] {
    data = data || [];
    if (!filter?.page) return data;

    const start = filter.page.start;
    const end = filter.page.end;

    if (start >= 0 && end >= start) {
      return data.slice(start, end);
    }

    return data;
  }
}
