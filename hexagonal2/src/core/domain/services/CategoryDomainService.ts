import { Category } from '../entities';
import { CategoryRepository, CategoryService } from '../ports';

export class CategoryDomainService implements CategoryService {
  constructor(private repository: CategoryRepository) {}

  findById(id: number): Promise<Category> {
    return this.repository.findById(id);
  }

  findAll(): Promise<Category[]> {
    return this.repository.findAll();
  }
}
