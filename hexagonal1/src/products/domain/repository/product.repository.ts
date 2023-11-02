import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '../../../products/entities/product.entity';
import { IUbitsFilter } from 'src/core/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SimpleRepository } from '../../../core/domain/base-simple.repository';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductRepository
  implements SimpleRepository<Product, CreateProductDto, UpdateProductDto>
{
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async get(id: string): Promise<Product> {
    let product: Product;

    if (isUUID(id)) {
      product = await this.productRepository.findOneBy({ id });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: id.toUpperCase(),
          slug: id.toLowerCase(),
        })
        .getOne();
    }

    if (!product) throw new NotFoundException(`Product with ${id} not found`);

    return product;
  }
  async search(filter?: IUbitsFilter): Promise<Product[]> {
    const { pageFrom, pageTo } = filter;

    const offset = pageFrom;

    const products = await this.productRepository.find({
      take: pageTo,
      skip: offset,
    });

    return products;
  }

  async create(value: CreateProductDto): Promise<any> {
    try {
      const product = this.productRepository.create(value);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }

    throw new Error('Method not implemented.');
  }
  async update(value: UpdateProductDto, args?: any): Promise<any> {
    const { id } = args;

    const product = await this.productRepository.preload({
      id: id,
      ...value,
    });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      //await this.productRepository.save(product);
      return this.get(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleDBExceptions(error);
    }
  }
  async delete(value: string): Promise<any> {
    const product = await this.get(value);
    await this.productRepository.remove(product);
  }
  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error?.detail);
    }

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unespected error, check server logs !!',
    );
  }
}
