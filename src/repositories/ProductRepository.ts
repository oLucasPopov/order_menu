import { AddProduct, Product } from "../entities/Product";

export interface ICreateProductRepository {
  create(data: AddProduct): Promise<Product>;
}