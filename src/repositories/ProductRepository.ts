import { AddProduct, Product, UpdateProduct } from "../entities/Product";

export interface ICreateProductRepository {
  create(data: AddProduct): Promise<Product>;
}

export interface IGetProductRepository {
  get(id: number): Promise<Product>;
}

export interface IListProductsRepository {
  list(currentPage: number, itemsPerPage: number): Promise<Product[]>;
}

export interface IUpdateProductRepository {
  update(id: number, data: UpdateProduct): Promise<Product>;
}