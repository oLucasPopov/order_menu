import { Product } from "../../../entities/Product";
import { IGetProductRepository } from "../../../repositories/ProductRepository";
import { IGetProductUseCase } from "../ProductUseCases";


export class GetProductUseCase implements IGetProductUseCase {
  constructor(
    private productRepository: IGetProductRepository
  ) {}

  async execute(id: number): Promise<Product> {
    const product = await this.productRepository.get(id);
    return product 
  }
}