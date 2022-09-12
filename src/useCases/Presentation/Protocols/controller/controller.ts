import { IHttpRequest, IHttpResponse } from "../http/http";

export interface IController {
  handle: (request: IHttpRequest) => Promise<IHttpResponse>
}