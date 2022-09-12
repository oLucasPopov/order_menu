import { AddProduct, Product } from "../../../entities/Product";
import { ICreateProductRepository } from "../../../repositories/ProductRepository";
import { ok } from "../../Presentation/helpers/http/httpHelper";
import { IHttpRequest } from "../../Presentation/Protocols/http";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

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

const makeFakeRequest = (omit: string): IHttpRequest => {

  const body = fakeProductData()

  if (omit) {
    delete body[omit as keyof typeof body];
  }

  return { body }
};

const makeFakeProduct = () => ({
  id: 1,
  ...fakeProductData()
});

const makeSut = () => {
  class CreateProductRepositoryStub implements ICreateProductRepository {
    async create(product: any): Promise<any> {
      return Promise.resolve(product);
    }
  }

  const createProductRepositoryStub = new CreateProductRepositoryStub();
  const createProductUseCaseStub = new CreateProductUseCase(createProductRepositoryStub);
  const sut = new CreateProductController(createProductUseCaseStub);
  return { sut, createProductUseCaseStub };
}

class CreateProductRepositoryStub implements ICreateProductRepository {
  async create(product: AddProduct): Promise<Product> {
    return Promise.resolve(Object.assign({}, product, { id: 1 }));
  }
}

describe('Create Product Controller', () => {
  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest('name'));
    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 400 if no price is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest('price'));
    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 400 if no quantity is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest('quantity'));
    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 400 if no description is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest('description'));
    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 400 if no category is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest('category'));
    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 400 if no unit is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest('unit'));
    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 200 if all required fields are provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest(''));
    expect(httpResponse.statusCode).toBe(200);
  })

  it('should call CreateProductUseCase with correct values', async () => {
    const { sut, createProductUseCaseStub } = makeSut();
    const createSpy = jest.spyOn(createProductUseCaseStub, 'execute');
    await sut.handle(makeFakeRequest(''));
    expect(createSpy).toHaveBeenCalledWith(fakeProductData());
  })

  it('should return 500 if CreateProductUseCase throws', async () => {
    const { sut, createProductUseCaseStub } = makeSut();
    jest.spyOn(createProductUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeFakeRequest(''));
    expect(httpResponse.statusCode).toBe(500);
  })

  it('should return product if valid data is provided', async () => {
    const { sut, createProductUseCaseStub } = makeSut();
    jest.spyOn(createProductUseCaseStub, 'execute').mockReturnValueOnce(Promise.resolve(makeFakeProduct()));
    const httpResponse = await sut.handle(makeFakeRequest(''));
    expect(httpResponse).toEqual(ok(makeFakeProduct()));
  })
})

describe('Create Product Use Case', () => {
  it('should call CreateProductRepository with correct values', async () => {
    const createProductRepositoryStub = new CreateProductRepositoryStub();
    const createProductUseCase = new CreateProductUseCase(createProductRepositoryStub);
    const createSpy = jest.spyOn(createProductRepositoryStub, 'create');
    await createProductUseCase.execute(fakeProductData());
    expect(createSpy).toHaveBeenCalledWith(fakeProductData());
  })

  it('should throw if CreateProductRepository throws', async () => {
    const createProductRepositoryStub = new CreateProductRepositoryStub();
    const createProductUseCase = new CreateProductUseCase(createProductRepositoryStub);
    jest.spyOn(createProductRepositoryStub, 'create').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = createProductUseCase.execute(fakeProductData());
    await expect(promise).rejects.toThrow();
  })

  it('Should have property ID after creating product', async () => {
    const createProductRepositoryStub = new CreateProductRepositoryStub();
    const createProductUseCase = new CreateProductUseCase(createProductRepositoryStub);
    const product = await createProductUseCase.execute(fakeProductData());
    expect(product).toHaveProperty('id');
  })

  it('Should have property name after creating product', async () => {
    const createProductRepositoryStub = new CreateProductRepositoryStub();
    const createProductUseCase = new CreateProductUseCase(createProductRepositoryStub);
    const product = await createProductUseCase.execute(fakeProductData());
    expect(product).toHaveProperty('name');
  })
})