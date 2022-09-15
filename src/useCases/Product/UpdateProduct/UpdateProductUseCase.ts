import { Product, UpdateProduct } from "../../../entities/Product";
import { IUpdateProductRepository } from "../../../repositories/ProductRepository";
import { IUpdateProductUseCase } from "../ProductUseCases";


export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(private readonly updateProductRepository: IUpdateProductRepository) {}
  async execute(product: UpdateProduct, productId: number): Promise<Product> {
    return this.updateProductRepository.update(productId, product);
  }
}