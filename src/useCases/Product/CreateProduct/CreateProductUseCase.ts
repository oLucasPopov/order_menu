import { Product } from "../../../entities/Product";
import { ICreateProductRepository } from "../../../repositories/ProductRepository";
import { ICreateProductDTO } from "./CreateProductDTO";

export class CreateProductUseCase {
  constructor(
    private productRepository: ICreateProductRepository
  ) { }

  async execute(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();
    Object.assign(product, data);
    const newProduct = await this.productRepository.create(product);
    return Promise.resolve(newProduct);
  }
}