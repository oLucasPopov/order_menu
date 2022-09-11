import { IHttpResponse } from "../../Protocols/http";

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: error
})

export const notFound = (error: Error): IHttpResponse => ({
  statusCode: 404,
  body: error
})