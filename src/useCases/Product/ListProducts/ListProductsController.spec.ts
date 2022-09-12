import { ListProductsController } from "./ListProductsController";

const makeSut = () => {
  const sut = new ListProductsController();
  return { sut };
};

describe('ListProductsController', () => {
  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse.statusCode).toBe(200);
  });
});