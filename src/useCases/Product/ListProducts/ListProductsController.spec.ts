import { Product } from "../../../entities/Product";
import { MissingHeaderError } from "../../Presentation/errors/MissingHeaderError";
import { serverError } from "../../Presentation/helpers/http/httpHelper";
import { IListProductsUseCase } from "../../Presentation/Protocols/useCases/ProductUseCases";
import { ListProductsController } from "./ListProductsController";

const makeSut = () => {
  class ListProductsUseCaseStub implements IListProductsUseCase {
    async execute(): Promise<Product[]> {
      return new Promise((resolve) => resolve([]));
    }
  }
  const listProductsUseCaseStub = new ListProductsUseCaseStub();
  const sut = new ListProductsController(listProductsUseCaseStub);
  return {
    sut,
    listProductsUseCaseStub
  };
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

  it('Should return 400 if x-items-per-page is invalid', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({
      headers: {
        "Content-Type": "application/json",
        "x-current-page": 1,
        "x-items-per-page": "invalid",
      }
    });
    expect(httpResponse.statusCode).toBe(400);
  });

  it('Should return 500 if ListProductsUseCase throws', async () => {
    const { sut, listProductsUseCaseStub } = makeSut();

    jest.spyOn(listProductsUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(500);
  });

  it('Should return serverError if ListProductsUseCase throws', async () => {
    const { sut, listProductsUseCaseStub } = makeSut();

    jest.spyOn(listProductsUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error('any_error');
    });

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error('any_error')));
  });

  it('Should call ListProductsUseCase with correct values', async () => {
    const { sut, listProductsUseCaseStub } = makeSut();

    const executeSpy = jest.spyOn(listProductsUseCaseStub, 'execute');

    await sut.handle(makeFakeRequest());
    expect(executeSpy).toHaveBeenCalledWith({ currentPage: 1, itemsPerPage: 20 });
  });

  it('Should return 200 if ListProductsUseCase succeeds', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(200);
  });

  it('Should return an array of products if ListProductsUseCase succeeds', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.body).toEqual([]);
  });
});