import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Mazda',
      createAt: new Date().getTime(),
      updateAt: new Date().getTime(),
    },
  ];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const newBrand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createAt: new Date().getTime(),
      updateAt: new Date().getTime(),
    };

    this.brands.push(newBrand);

    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDb = this.findOne(id);
    this.brands = this.brands.map((car) => {
      if (car.id === id) {
        brandDb = {
          ...brandDb,
          ...updateBrandDto,
          id,
        };

        return brandDb;
      }
      return car;
    });
    return brandDb;
  }

  remove(id: string) {
    return this.brands.filter((car) => car.id != id);
  }

  fillCarsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
