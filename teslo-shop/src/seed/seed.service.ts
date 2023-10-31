import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class SeedService {
  /**
   *
   */
  constructor(private readonly productsService: ProductsService) {}
  async runSeed() {
    await this.insertNewProducts();
  }

  private async insertNewProducts() {
    try {
      await this.productsService.deletAllProducts();
      return true;
    } catch (error) {
      return false;
    }
  }
}
