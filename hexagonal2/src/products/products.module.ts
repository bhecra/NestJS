import { Module } from '@nestjs/common';
import { ProductsService } from './application/products.service';
import { ProductsController } from './infrastructure/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/entities/product.entity';
import { ProductRepository } from './domain/repository/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
