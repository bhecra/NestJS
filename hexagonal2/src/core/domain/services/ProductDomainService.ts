import { ProductServiceError } from 'src/core/shared/error/ProductServiceError';
import { Product } from '../entities';
import { ProductRepository, ProductService } from '../ports';

export class ProductDomainService implements ProductService {
  constructor(private repository: ProductRepository) {}

  async save(product: Product): Promise<Product> {
    if (this.validateProductPrice(product)) {
      return this.repository.save(product);
    }
    throw new ProductServiceError(
      'Product price cannot be negative or equal to zero',
    );
  }

  validateProductPrice(product: Product): boolean {
    return product.unitPrice > 0;
  }
}
