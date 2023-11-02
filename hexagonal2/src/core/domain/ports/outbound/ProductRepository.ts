import { Product } from '../../entities';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
}
