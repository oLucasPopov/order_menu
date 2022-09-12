import { MissingParamError } from "../../Presentation/errors/MissingParamError";
import { NotFoundError } from "../../Presentation/errors/NotFoundError";
import { badRequest, notFound, ok, serverError } from "../../Presentation/helpers/http/httpHelper";
import { IController } from "../../Presentation/Protocols/controller/controller";
import { IHttpRequest, IHttpResponse } from "../../Presentation/Protocols/http/http";
import { IGetProductUseCase } from "../../Presentation/Protocols/useCases/ProductUseCases";


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