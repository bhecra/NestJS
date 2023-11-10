import { Inject, Injectable } from '@nestjs/common';
import { PaginationDto } from '../../../common/domain/dtos/pagination.dto';
import { ProductRepositoryAdapter } from '../adapters/product.repository.adapter';
import { IUbitsFilter } from '../../../core/utils';
import { SimpleRepository } from '../../../core/domain/repository/base-simple.repository';
import { ProductModel } from '../../domain/entities/product.model';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepositoryAdapter)
    private readonly productRepository: SimpleRepository<ProductModel>,
  ) {}

  async create(createProductDto: ProductModel) {
    const product = this.productRepository.create(createProductDto);
    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const initFilter: IUbitsFilter = {
      args: {},
      pageFrom: offset,
      pageTo: limit,
    };

    const products = await this.productRepository.search(initFilter);

    return products;
  }

  findOne(id: string) {
    return this.productRepository.get(id);
  }

  update(id: number, updateProductDto: Partial<ProductModel>) {
    const args = { id: `${id}` };
    return this.productRepository.update(updateProductDto, args);
  }

  async remove(id: string) {
    return this.productRepository.delete(id);
  }
}
