import { IUbitsFilter } from 'src/core/utils';
import { SimpleRepository } from '../../../core/domain/base-simple.repository';
import { ProductModel } from '../entities/product.model';
export class ProductRepository implements SimpleRepository<ProductModel> {
  /**
   *
   */
  constructor() {}
  get(id?: string, args?: any): Promise<ProductModel> {
    throw new Error('Method not implemented.');
  }
  search(filter?: IUbitsFilter, args?: any): Promise<ProductModel[]> {
    throw new Error('Method not implemented.');
  }
  create(item: ProductModel, args?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(item: Partial<ProductModel>, args?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id?: string | ProductModel, args?: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
