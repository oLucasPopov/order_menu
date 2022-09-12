import { Router } from "express"
import { createProductController } from "./useCases/Product/CreateProduct"
import { adaptRoute } from "./helpers/expressRouteAdapter"
import { getProductController } from "./useCases/Product/GetProduct";


const router = Router()

router.post('/products', adaptRoute(createProductController));
router.get('/products/:id', adaptRoute(getProductController));

export { router }	