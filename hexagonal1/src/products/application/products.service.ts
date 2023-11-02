import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../domain/dto/create-product.dto';
import { UpdateProductDto } from '../domain/dto/update-product.dto';
import { Product } from '../domain/entities/product.entity';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { ProductRepository } from '../domain/repository/product.repository';
import { IUbitsFilter } from '../../core/utils';
import { SimpleRepository } from '../../core/domain/base-simple.repository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: SimpleRepository<
      Product,
      CreateProductDto,
      UpdateProductDto
    >,
  ) {}

  async create(createProductDto: CreateProductDto) {
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

  update(id: number, updateProductDto: UpdateProductDto) {
    const args = { id: `${id}` };
    return this.productRepository.update(updateProductDto, args);
  }

  async remove(id: string) {
    return this.productRepository.delete(id);
  }
}
