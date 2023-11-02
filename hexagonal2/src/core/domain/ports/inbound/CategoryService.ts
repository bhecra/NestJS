import { Category } from '../../entities';

export interface CategoryService {
  findById(id: number): Promise<Category>;
  findAll(): Promise<Category[]>;
}
