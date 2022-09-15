import { MissingParamError } from "../../utils/errors";
import { badRequest, ok } from "../../utils/helpers/httpHelper";
import { IController, IHttpRequest, IHttpResponse } from "../../utils/protocols";


export class UpdateProductController implements IController {
  constructor() {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    if(!request.params.id) {
      return badRequest(new MissingParamError('id'));
    }

    return ok({})
  }
}