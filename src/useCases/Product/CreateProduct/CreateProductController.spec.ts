import { IHttpRequest } from "../../Presentation/Protocols/http";
import { CreateProductController } from "./CreateProductController";

const makeFakeRequest = (omit: string): IHttpRequest => {

  const body = {
    name: 'any_name',
    price: 'any_price',
    description: 'any_description',
    quantity: 'any_quantity',
  }

  if (omit) {
    delete body[omit as keyof typeof body];
  }

  return { body }
};

describe('Create Product Controller', () => {
  it('should return 400 if no name is provided', async () => {
    const sut = new CreateProductController();
    const httpResponse = await sut.handle(makeFakeRequest('name'));
    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 400 if no price is provided', async () => {
    const sut = new CreateProductController();
    const httpResponse = await sut.handle(makeFakeRequest('price'));
    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 400 if no quantity is provided', async () => {
    const sut = new CreateProductController();
    const httpResponse = await sut.handle(makeFakeRequest('quantity'));
    expect(httpResponse.statusCode).toBe(400);
  })
})