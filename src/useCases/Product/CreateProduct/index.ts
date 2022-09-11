import { ProductPostgresRepository } from "../../../repositories/implementations/PG/Repositories/ProductPostgresRepository";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const createProductRepository = new ProductPostgresRepository()
const createProductUseCase = new CreateProductUseCase(createProductRepository)
const createProductController = new CreateProductController(createProductUseCase)

export { createProductController }