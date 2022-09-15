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
});