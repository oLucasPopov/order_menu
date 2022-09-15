import { AddProduct, Product } from "../../../entities/Product";
import { ICreateProductRepository } from "../../../repositories/ProductRepository";
import { ICreateProductUseCase } from "../ProductUseCases";

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    private productRepository: ICreateProductRepository
  ) { }

  async execute(data: AddProduct): Promise<Product> {
    const newProduct = await this.productRepository.create(data);
    return Promise.resolve(newProduct);
  }
}