import { Product, UpdateProduct } from "../../../entities/Product";
import { IUpdateProductUseCase } from "../ProductUseCases";


export class UpdateProductUseCase implements IUpdateProductUseCase {
  async execute(product: UpdateProduct, productId: number): Promise<Product> {
    return new Product()
  }
}