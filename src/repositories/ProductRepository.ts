import { AddProduct, Product } from "../entities/Product";

export interface ICreateProductRepository {
  create(data: AddProduct): Promise<Product>;
}

export interface IGetProductRepository {
  get(id: string): Promise<Product>;
}