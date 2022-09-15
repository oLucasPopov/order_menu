import { Router } from "express"
import { adaptRoute } from "./helpers/expressRouteAdapter"
import { productControllers } from "./useCases/Product"


const router = Router()

router.post('/products', adaptRoute(productControllers.create));
router.get('/products/:id', adaptRoute(productControllers.get));
router.get('/products', adaptRoute(productControllers.list));
router.put('/products/:id', adaptRoute(productControllers.update));

export { router }	