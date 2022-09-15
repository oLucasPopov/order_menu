import { MissingParamError, NotFoundError} from "../../utils/errors";
import { badRequest, notFound, ok, serverError } from "../../utils/helpers/httpHelper";
import { IController, IHttpRequest, IHttpResponse } from "../../utils/protocols";
import { IGetProductUseCase } from "../ProductUseCases";


export class GetProductController implements IController {
  constructor(
    private getProductUseCase: IGetProductUseCase
  ) { }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      if (!request.params.id) {
        return badRequest(new MissingParamError('id'))
      }

      const { id } = request.params;

      const product = await this.getProductUseCase.execute(id);

      if (!product) {
        return notFound(new NotFoundError('Product'));
      }

      return ok(product);
    } catch (error: any) {
      return serverError(error);
    }
  }
}