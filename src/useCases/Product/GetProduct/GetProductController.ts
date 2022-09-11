import { MissingParamError } from "../../Presentation/errors/MissingParamError";
import { badRequest } from "../../Presentation/helpers/http/httpHelper";
import { IController } from "../../Presentation/Protocols/controller";
import { IHttpRequest, IHttpResponse } from "../../Presentation/Protocols/http";


export class GetProductController implements IController {
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    if(!request.params.id) {
      return badRequest(new MissingParamError('id'))
    }

    return Promise.resolve({
      statusCode: 200,
      body: null
    })
  }
}