import { Module } from '@nestjs/common';
import { ProductsService } from './infrastructure/services/products.service';
import { ProductsController } from './infrastructure/controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepositoryAdapter } from './infrastructure/adapters/product.repository.adapter';
import { ProductEntity } from './infrastructure/pg-db/entities/product.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepositoryAdapter],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductsModule {}
