import { Supplier } from '../../entities';

export interface SupplierRepository {
  findById(id: number): Promise<Supplier>;
}
