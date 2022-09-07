import { CreateProductController } from "./CreateProductController";

describe('Create Product Controller', () => {
  it('should return 400 if no name is provided', async () => {
    const sut = new CreateProductController();
    const httpRequest = {
      body: {
        price: 10,
        quantity: 10,
      }
    }
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 400 if no price is provided', async () => {
    const sut = new CreateProductController();
    const httpRequest = {
      body: {
        name: 'any_name',
        quantity: 10,
      }
    }
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 400 if no quantity is provided', async () => {
    const sut = new CreateProductController();
    const httpRequest = {
      body: {
        name: 'any_name',
        price: 10,
      }
    }
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  })
})