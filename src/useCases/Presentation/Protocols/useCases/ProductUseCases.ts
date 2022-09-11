import { Product } from "../../../../entities/Product";

export interface IGetProductUseCase {
  execute(id: string): Promise<Product>
}