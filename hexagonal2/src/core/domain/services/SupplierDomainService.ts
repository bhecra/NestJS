import { Supplier } from '../entities';
import { SupplierRepository, SupplierService } from '../ports';

export class SupplierDomainService implements SupplierService {
  constructor(private repository: SupplierRepository) {}

  findById(id: number): Promise<Supplier> {
    return this.repository.findById(id);
  }
}
