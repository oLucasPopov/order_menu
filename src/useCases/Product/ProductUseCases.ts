import { AddProduct, Product, UpdateProduct } from "../../entities/Product";
import { IPagination } from "../utils/protocols/pagination/pagination";

export interface IGetProductUseCase {
  execute(id: number): Promise<Product>
}

export interface ICreateProductUseCase {
  execute(product: AddProduct): Promise<Product>
}

export interface IListProductsUseCase {
  execute(pagination: IPagination): Promise<Product[]>
}

export interface IUpdateProductUseCase {
  execute(product: UpdateProduct, productId: number): Promise<Product>
}