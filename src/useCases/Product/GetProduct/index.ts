import { ProductPostgresRepository } from "../../../repositories/implementations/PG/Product/ProductPostgresRepository";
import { GetProductController } from "./GetProductController";
import { GetProductUseCase } from "./GetProductUseCase";


const getProductPostgresRepository = new ProductPostgresRepository();
const getProductUseCase = new GetProductUseCase(getProductPostgresRepository);
const getProductController = new GetProductController(getProductUseCase);

export { getProductController }