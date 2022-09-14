import { AddProduct, Product } from "../../../../entities/Product";

export interface IGetProductUseCase {
  execute(id: number): Promise<Product>
}

export interface ICreateProductUseCase {
  execute(product: AddProduct): Promise<Product>
}

export interface IListProductsUseCase {
  execute(): Promise<Product[]>
}