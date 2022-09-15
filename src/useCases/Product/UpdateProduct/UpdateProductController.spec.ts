import { MissingParamError } from "../../utils/errors";
import { badRequest } from "../../utils/helpers/httpHelper";
import { UpdateProductController } from "./UpdateProductController";


describe('UpdateProductController', () => {
  it('should return MissingParamError if no id is provided', async () => {
    const sut = new UpdateProductController()
    const httpRequest = {
      params: {
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')));
  })

  it('should return 200 if valid id is provided', async () => {
    const sut = new UpdateProductController()
    const httpRequest = {
      params: {
        id: 'any_id'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200);
  })
});