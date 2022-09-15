import { createProductController } from "./CreateProduct";
import { getProductController } from "./GetProduct";
import { listProductsController } from "./ListProducts";
import { updateProductController } from "./UpdateProduct";

const productControllers = {
  create: createProductController,
  get: getProductController,
  list: listProductsController,
  update: updateProductController,
}

export { productControllers }