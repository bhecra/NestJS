import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';
import { CASRS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {
  /**
   *
   */
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}
  populateDB() {
    this.carsService.fillCarsWithSeedData(CASRS_SEED);
    this.brandsService.fillCarsWithSeedData(BRANDS_SEED);
  }
}
