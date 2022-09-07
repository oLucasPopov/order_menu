import { MissingParamError } from "../../Presentation/errors/MissingParamError";
import { badRequest, ok } from "../../Presentation/helpers/http/httpHelper";
import { IController } from "../../Presentation/Protocols/controller";
import { IHttpRequest, IHttpResponse } from "../../Presentation/Protocols/http";

export class CreateProductController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {

    if (!request.body.name) {
      return badRequest(new MissingParamError('name'));
    }

    if (!request.body.price) {
      return badRequest(new MissingParamError('price'));
    }

    if (!request.body.quantity) {
      return badRequest(new MissingParamError('quantity'));
    }

    return Promise.resolve(ok({}));
  }
}