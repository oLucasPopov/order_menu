import { MissingParamError } from "../../Presentation/errors/MissingParamError";
import { badRequest, ok } from "../../Presentation/helpers/http/httpHelper";
import { IController } from "../../Presentation/Protocols/controller";
import { IHttpRequest, IHttpResponse } from "../../Presentation/Protocols/http";

export class CreateProductController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const requiredFields = ['name', 'price', 'quantity', 'description'];

    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }


    return Promise.resolve(ok({}));
  }
}