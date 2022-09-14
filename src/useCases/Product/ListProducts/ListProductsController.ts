import { InvalidParamError, MissingHeaderError } from "../../Presentation/errors";
import { badRequest, ok } from "../../Presentation/helpers/http/httpHelper";
import { IController, IHttpRequest, IHttpResponse } from "../../Presentation/Protocols";
import { IListProductUseCase } from "../../Presentation/Protocols/useCases/ProductUseCases";
import { serverError } from "../../Presentation/helpers/http/httpHelper";


export class ListProductsController implements IController {

  constructor(
    private listProductUseCase: IListProductUseCase
  ) { }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredHeaders = ['x-current-page', 'x-items-per-page'];

      for (let header of requiredHeaders) {
        if (!request.headers[header]) {
          return badRequest(new MissingHeaderError(header));
        }
      }

      for (let header of requiredHeaders) {
        if (typeof request.headers[header] !== 'number') {
          return badRequest(new InvalidParamError(header));
        }
      }

      const products = this.listProductUseCase.execute();

      return ok(products);
    } catch (error: any) {
      return serverError(error);
    }
  }
}