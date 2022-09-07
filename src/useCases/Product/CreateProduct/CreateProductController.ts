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

    return Promise.resolve(ok({}));
  }
}