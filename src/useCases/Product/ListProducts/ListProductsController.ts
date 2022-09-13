import { MissingHeaderError } from "../../Presentation/errors/MissingHeaderError";
import { badRequest, ok } from "../../Presentation/helpers/http/httpHelper";
import { IController, IHttpRequest, IHttpResponse } from "../../Presentation/Protocols";


export class ListProductsController implements IController {

  async handle(request: IHttpRequest): Promise<IHttpResponse> {

    if(!request.headers["x-current-page"]) {
      return badRequest(new MissingHeaderError("x-current-page"));
    }

    return ok([]);
  }
}