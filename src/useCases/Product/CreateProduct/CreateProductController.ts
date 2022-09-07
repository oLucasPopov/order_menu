import { ok } from "../../Presentation/helpers/http/httpHelper";
import { IController } from "../../Presentation/Protocols/controller";
import { IHttpRequest, IHttpResponse } from "../../Presentation/Protocols/http";

export class CreateProductController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {

    if (!request.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }


    return Promise.resolve(ok({}));
  }
}