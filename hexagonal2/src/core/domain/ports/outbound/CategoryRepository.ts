import { Category } from '../../entities';

export interface CategoryRepository {
  findById(id: number): Promise<Category>;
  findAll(): Promise<Category[]>;
}
