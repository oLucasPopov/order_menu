import { Product } from "../../../entities/Product";
import { IListProductsRepository } from "../../../repositories/ProductRepository";
import { IPagination } from "../../Presentation/Protocols";
import { IListProductsUseCase } from "../../Presentation/Protocols/useCases/ProductUseCases";


export class ListProductsUseCase implements IListProductsUseCase {
  constructor(
    private readonly productRepository: IListProductsRepository,
  ) { }

  async execute(pagination: IPagination): Promise<Product[]> {
    const products = await this.productRepository.list(pagination.currentPage, pagination.itemsPerPage);
    return products;
  }
}