import { ProductPostgresRepository } from "../../../repositories/implementations/PG/Product/ProductPostgresRepository";
import { UpdateProductController } from "./UpdateProductController";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

const updateproductrepository = new ProductPostgresRepository();
const updateProductUseCase = new UpdateProductUseCase(updateproductrepository);
const updateProductController = new UpdateProductController(updateProductUseCase);

export { updateProductController};