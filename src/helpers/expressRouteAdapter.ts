import { IHttpRequest, IHttpResponse } from "../useCases/Presentation/Protocols/http/http";
import { Request, RequestHandler, Response } from 'express'
import { IController } from "../useCases/Presentation/Protocols/controller/controller";

export const adaptRoute = (controller: IController): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers
    }
    const httpResponse: IHttpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
      
    }
  }
};
