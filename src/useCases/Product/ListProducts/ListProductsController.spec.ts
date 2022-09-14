import { Product } from "../../../entities/Product";
import { IListProductsRepository } from "../../../repositories/ProductRepository";
import { MissingHeaderError } from "../../Presentation/errors/MissingHeaderError";
import { serverError } from "../../Presentation/helpers/http/httpHelper";
import { IListProductsUseCase } from "../../Presentation/Protocols/useCases/ProductUseCases";
import { ListProductsController } from "./ListProductsController";

const fakeProduct = (): Product => ({
  id: 1,
  name: 'valid_name',
  description: 'valid_description',
  price: 10,
  quantity: 10,
  category: 2,
  cost: 5,
  barcode: 'valid_barcode',
  unit: 1,
  expirationDate: new Date(),
  providerCode: 1,
  ean: 'valid_ean',
  ncm: 'valid_ncm',
  cest: 'valid_cest',
  origin: 'valid_origin',
  height: 1,
  width: 1,
  length: 1,
  liquidWeight: 1,
  bruteWeight: 1,
})

const makeSut = () => {
  class ListProductsRepositoryStub implements IListProductsRepository {
    list(): Promise<Product[]> {
      return new Promise((resolve) => resolve([fakeProduct()]));
    }
  }

  class ListProductsUseCaseStub implements IListProductsUseCase {
    constructor(
      private readonly productRepository: IListProductsRepository,
    ) { }
    async execute(): Promise<Product[]> {
      return new Promise((resolve) => resolve([]));
    }
  }
  const listProductsRepositoryStub = new ListProductsRepositoryStub();
  const listProductsUseCaseStub = new ListProductsUseCaseStub(listProductsRepositoryStub);
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
    const { sut, listProductsUseCaseStub } = makeSut();

    jest.spyOn(listProductsUseCaseStub, 'execute')
      .mockReturnValueOnce(Promise.resolve([fakeProduct()]));

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

  it('Should return an array of products if ListProductsUseCase succeeds', async () => {
    const { sut, listProductsUseCaseStub } = makeSut();

    jest.spyOn(listProductsUseCaseStub, 'execute').mockImplementationOnce(() => {
      return new Promise((resolve) => resolve([fakeProduct()]));
    });

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.body).toEqual([fakeProduct()]);
  });

  it('Should return 204 if ListProductsUseCase returns an empty array', async () => {
    const { sut, listProductsUseCaseStub } = makeSut();

    jest.spyOn(listProductsUseCaseStub, 'execute').mockImplementationOnce(() => {
      return new Promise((resolve) => resolve([]));
    });

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(204);
  });
});