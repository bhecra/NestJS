import { Product } from '../../entities';

export interface ProductService {
  save(product: Product): Promise<Product>;
  validateProductPrice(product: Product): boolean;
}
