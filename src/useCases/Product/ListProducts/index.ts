import { ListProductsUseCase } from "./ListProductsUseCase";
import { ListProductsController } from "./ListProductsController";
import { ProductPostgresRepository } from "../../../repositories/implementations/PG/Repositories/ProductPostgresRepository";


const productRepository = new ProductPostgresRepository();
const listProductsUseCase = new ListProductsUseCase(productRepository);
const listProductsController = new ListProductsController(listProductsUseCase);

export { listProductsController };