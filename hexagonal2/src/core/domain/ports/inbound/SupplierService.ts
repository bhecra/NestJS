import { Supplier } from '../../entities';

export interface SupplierService {
  findById(id: number): Promise<Supplier>;
}
