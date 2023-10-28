import { Brand } from '../../brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';

export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Toyota',
    createAt: new Date().getTime(),
    updateAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Mazda',
    createAt: new Date().getTime(),
    updateAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Renault',
    createAt: new Date().getTime(),
    updateAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'BMW',
    createAt: new Date().getTime(),
    updateAt: new Date().getTime(),
  },
];
