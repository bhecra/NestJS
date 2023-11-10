import { SimpleRepository } from '../../../core/domain/repository/base-simple.repository';
import { ProductModel } from '../entities/product.model';
export interface ProductRepository extends SimpleRepository<ProductModel> {}
