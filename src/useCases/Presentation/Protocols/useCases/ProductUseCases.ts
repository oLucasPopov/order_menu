import { Product } from "../../../../entities/Product";

export interface IGetProductUseCase {
  execute(id: number): Promise<Product>
}