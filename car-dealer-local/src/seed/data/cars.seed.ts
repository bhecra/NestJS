import { ICar } from '../../cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';

export const CASRS_SEED: ICar[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corolla',
  },
  {
    id: uuid(),
    brand: 'Honda',
    model: 'Civic',
  },
  {
    id: uuid(),
    brand: 'Jeep',
    model: 'Cherokee',
  },
  {
    id: uuid(),
    brand: 'Mazda',
    model: 'CX-30',
  },
];
