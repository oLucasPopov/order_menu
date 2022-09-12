import { Product } from "../../../entities/Product";
import { IGetProductRepository } from "../../../repositories/ProductRepository";
import { NotFoundError } from "../../Presentation/errors/NotFoundError";
import { IGetProductUseCase } from "../../Presentation/Protocols/useCases/ProductUseCases";
import { GetProductController } from "./GetProductController";

const fakeRequest = () => ({
  params: {
    id: 1
  }
});

const fakeProductData = () => ({
  name: 'any_name',
  cost: 10,
  price: 20,
  quantity: 30,
  barcode: 'any_barcode',
  description: 'any_description',
  category: 1,
  unit: 1,
  expirationDate: new Date(2023, 1, 1, 1, 1, 1, 1),
  providerCode: 1,
  ean: 'any_ean',
  ncm: 'any_ncm',
  cest: 'any_cest',
  origin: 'any_origin',
  liquidWeight: 40,
  bruteWeight: 50,
  width: 50,
  height: 60,
  length: 70,
})

const makeFakeProduct = () => ({
  id: 1,
  ...fakeProductData()
});

const makeSut = () => {
  class GetProductRepositoryStub implements IGetProductRepository {
    async get(id: number): Promise<Product> {
      return new Promise(resolve => resolve(makeFakeProduct()));
    }
  }

  class GetProductUseCaseStub implements IGetProductUseCase {
    constructor(
      private productRepository: IGetProductRepository
    ) {}

    async execute(id: number): Promise<Product> {
      const product: Product = new Product();
      Object.assign(product, { id }, fakeProductData());
      return Promise.resolve(product);
    }
  }

  const getProductRepositoryStub = new GetProductRepositoryStub();
  const getProductUseCaseStub = new GetProductUseCaseStub(getProductRepositoryStub);
  const sut = new GetProductController(getProductUseCaseStub);
  return {
    getProductRepositoryStub,
    getProductUseCaseStub,
    sut
  };
}

describe('Get Product Controller', () => {
  it('Should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {}
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  it('Should call GetProductUseCase with correct id', async () => {
    const { sut, getProductUseCaseStub } = makeSut();
    const httpRequest = fakeRequest();

    const executeSpy = jest.spyOn(getProductUseCaseStub, 'execute');

    await sut.handle(httpRequest);

    expect(executeSpy).toHaveBeenCalledWith(1);
  });

  it('Should return a product on success', async () => {
    const { sut } = makeSut();
    const httpRequest = fakeRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(makeFakeProduct());
  });

  it('Should return 404 if GetProductUseCase returns null', async () => {
    const { sut, getProductUseCaseStub } = makeSut();
    const httpRequest = fakeRequest();

    jest.spyOn(getProductUseCaseStub, 'execute').mockReturnValueOnce(Promise.resolve(null as any));

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(404);
  });

  it('Should return NotFoundError if GetProductUseCase returns null', async () => {
    const { sut, getProductUseCaseStub } = makeSut();
    const httpRequest = fakeRequest();

    jest.spyOn(getProductUseCaseStub, 'execute').mockReturnValueOnce(Promise.resolve(null as any));

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.body).toEqual(new NotFoundError('Product'));
  });
});