import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ICar } from './interfaces/car.interface';
import { UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAllCars(): ICar[] {
    return this.carsService.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string): ICar {
    return this.carsService.findOne(id);
  }
  @Post()
  createCar(@Body() body: CreateCarDto) {
    return this.carsService.createCar(body);
  }
  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.updateCar(id, updateCarDto);
  }
  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.deleteCar(id);
  }
}
