import { ok } from "../../Presentation/helpers/http/httpHelper";
import { IController, IHttpRequest, IHttpResponse } from "../../Presentation/Protocols";


export class ListProductsController implements IController {

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    return ok([]);
  }
}