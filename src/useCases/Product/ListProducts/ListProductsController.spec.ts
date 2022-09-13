import { MissingHeaderError } from "../../Presentation/errors/MissingHeaderError";
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
  
  it('Should return missingHeaderError if no page is provided', async () => {
    const { sut } = makeSut();
 
    const httpResponse = await sut.handle({
      headers: {
        "Content-Type": "application/json",
        "x-items-per-page": 20,
      }
    });
    expect(httpResponse.body).toEqual(new MissingHeaderError('x-current-page'));
  });

  it('should return 400 if no items per page is provided', async () => {
    const { sut } = makeSut();
 
    const httpResponse = await sut.handle({
      headers: {
        "Content-Type": "application/json",
        "x-current-page": 1,
      }
    });
    expect(httpResponse.statusCode).toBe(400);
  });

  it('Should return missingHeaderError if no items per page is provided', async () => {
    const { sut } = makeSut();
 
    const httpResponse = await sut.handle({
      headers: {
        "Content-Type": "application/json",
        "x-current-page": 1,
      }
    });
    expect(httpResponse.body).toEqual(new MissingHeaderError('x-items-per-page'));
  });
  
  it('Should return 400 if x-current-page is invalid', async () => {
    const { sut } = makeSut();
 
    const httpResponse = await sut.handle({
      headers: {
        "Content-Type": "application/json",
        "x-current-page": "invalid",
        "x-items-per-page": 20,
      }
    });
    expect(httpResponse.statusCode).toBe(400);
  });
  
});