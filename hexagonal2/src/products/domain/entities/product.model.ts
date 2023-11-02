export interface ProductModel {
  id?: string;
  title: string;
  price?: number;
  description?: string;
  slug?: string;
  stock?: number;
  sizes: string[];
  gender: string;
  tags: string[];
}
