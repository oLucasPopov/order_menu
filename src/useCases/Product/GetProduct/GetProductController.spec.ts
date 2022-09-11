import { GetProductController } from "./GetProductController";

const fakeRequest = () => ({
  params: {
    id: 1
  }
});

describe('Get Product Controller', () => {
  it('Should return 400 if no id is provided', async () => {
    const sut = new GetProductController();
    const httpRequest = {
      params: {}
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  })
});