import { Module } from '@nestjs/common';
import { ProductsService } from './application/products.service';
import { ProductsController } from './infrastructure/controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domain/entities/product.entity';
import { ProductRepository } from './infrastructure/adapters/product.repository.adapter';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductsModule {}
