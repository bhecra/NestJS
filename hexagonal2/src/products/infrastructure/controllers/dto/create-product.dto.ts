import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ProductModel } from '../../../domain/entities/product.model';

export class CreateProductDto implements ProductModel {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  slug?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  tags: string[];

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  images?: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;
}
