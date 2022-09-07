import { IHttpResponse } from "../../Protocols/http";

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})