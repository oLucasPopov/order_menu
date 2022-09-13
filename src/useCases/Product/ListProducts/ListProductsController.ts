import { InvalidParamError, MissingHeaderError} from "../../Presentation/errors";
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

    for(let header of requiredHeaders) {
      console.log(header, ' :', typeof request.headers[header]);
      if(typeof request.headers[header] !== 'number') {
        return badRequest(new InvalidParamError(header));
      }
    }

    return ok([]);
  }
}