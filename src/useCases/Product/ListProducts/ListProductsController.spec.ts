import { ListProductsController } from "./ListProductsController";

const makeSut = () => {
  const sut = new ListProductsController();
  return { sut };
};

const makeFakeRequest = () => ({
  headers: {
    "Content-Type": "application/json",
    "x-current-page": 1,
    "x-items-per-page": 20,
  }
});

describe('ListProductsController', () => {
  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(200);
  });

  it('should return 400 if no page is provided', async () => {
    const { sut } = makeSut();
 
    const httpResponse = await sut.handle({
      headers: {
        "Content-Type": "application/json",
        "x-items-per-page": 20,
      }
    });
    expect(httpResponse.statusCode).toBe(400);
  });
  
});