import { MissingParamError } from "../../Presentation/errors/MissingParamError";
import { NotFoundError } from "../../Presentation/errors/NotFoundError";
import { badRequest, notFound, ok } from "../../Presentation/helpers/http/httpHelper";
import { IController } from "../../Presentation/Protocols/controller";
import { IHttpRequest, IHttpResponse } from "../../Presentation/Protocols/http";
import { IGetProductUseCase } from "../../Presentation/Protocols/useCases/ProductUseCases";


export class GetProductController implements IController {
  constructor(
    private getProductUseCase: IGetProductUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    if(!request.params.id) {
      return badRequest(new MissingParamError('id'))
    }

    const { id } = request.params;

    const product = await this.getProductUseCase.execute(id);
    
    if (!product) {
      return notFound(new NotFoundError('Product'));
    }

    return ok(product);
  }
}