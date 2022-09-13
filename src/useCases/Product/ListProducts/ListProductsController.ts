import { MissingHeaderError } from "../../Presentation/errors/MissingHeaderError";
import { badRequest, ok } from "../../Presentation/helpers/http/httpHelper";
import { IController, IHttpRequest, IHttpResponse } from "../../Presentation/Protocols";


export class ListProductsController implements IController {

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const requiredHeaders = ['x-current-page', 'x-items-per-page'];

    for(let header of requiredHeaders) {
      if(!request.headers[header]) {
        return badRequest(new MissingHeaderError(header));
      }
    }

    return ok([]);
  }
}