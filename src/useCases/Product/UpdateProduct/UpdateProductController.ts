import { Product, UpdateProduct } from "../../../entities/Product";
import { MissingParamError } from "../../utils/errors";
import { badRequest, ok } from "../../utils/helpers/httpHelper";
import { IController, IHttpRequest, IHttpResponse } from "../../utils/protocols";
import { IUpdateProductUseCase } from "../ProductUseCases";


export class UpdateProductController implements IController {
  constructor(
    private updateProductUseCase: IUpdateProductUseCase
  ) { }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    if (!request.params.id) {
      return badRequest(new MissingParamError('id'));
    }

    const { id } = request.params;
    const updateProduct = new UpdateProduct();

    Object.assign(updateProduct, request.body);

    const product = await this.updateProductUseCase.execute(updateProduct, id);

    return ok(product)
  }
}