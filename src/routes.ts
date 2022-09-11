import { Router } from "express"
import { createProductController } from "./useCases/Product/CreateProduct"
import { adaptRoute } from "./helpers/expressRouteAdapter"


const router = Router()

router.post('/products', adaptRoute(createProductController))

export { router }	