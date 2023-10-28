import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UpdateCarDto, CreateCarDto } from './dto';
import { ICar } from './interfaces/car.interface';
@Injectable()
export class CarsService {
  private cars = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Jeep',
    //   model: 'Cherokee',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Mazda',
    //   model: 'CX-30',
    // },
  ];

  getAllCars() {
    return this.cars;
  }
  findOne(id: string) {
    const car = this.cars.find((car) => car.id == id);

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return car;
  }

  createCar(car: CreateCarDto) {
    const newCar = { id: uuid(), ...car };
    this.cars.push(newCar);
    return newCar;
  }
  updateCar(id: string, updateCarDto: UpdateCarDto) {
    let carDb = this.findOne(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDb = {
          ...carDb,
          ...updateCarDto,
          id,
        };

        return carDb;
      }
      return car;
    });
    return carDb;
  }
  deleteCar(id: string) {
    return this.cars.filter((car) => car.id != id);
  }

  fillCarsWithSeedData(cars: ICar[]) {
    this.cars = cars;
  }
}
