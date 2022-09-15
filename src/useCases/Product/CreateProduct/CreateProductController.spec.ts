import { AddProduct, Product } from "../../../entities/Product";
import { ICreateProductRepository } from "../../../repositories/ProductRepository";
import { ok } from "../../utils/helpers/httpHelper";
import { IHttpRequest } from "../../utils/protocols";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const fakeProductData = (): Product => ({
  id: 1,
  name: 'any_name',
  cost: 10,
  price: 20,
  quantity: 30,
  barcode: 'any_barcode',
  description: 'any_description',
  id_category: 1,
  category: 'any_category',
  id_unit: 1,
  unit: 'any_unit',
  expirationDate: new Date(2023, 1, 1, 1, 1, 1, 1),
  id_supplier: 1,
  supplier: 'any_supplier',
  liquidWeight: 40,
  bruteWeight: 50,
  width: 50,
  height: 60,
  length: 70,
})

const fakeAddProductData = (): AddProduct => ({
  name: 'any_name',
  cost: 10,
  price: 20,
  quantity: 30,
  barcode: 'any_barcode',
  description: 'any_description',
  id_category: 1,
  id_unit: 1,
  expirationDate: new Date(2023, 1, 1, 1, 1, 1, 1),
  id_supplier: 1,
  liquidWeight: 40,
  bruteWeight: 50,
  width: 50,
  height: 60,
  length: 70,
});


const makeFakeRequest = (omit: string): IHttpRequest => {

  const body = fakeAddProductData()

  if (omit) {
    delete body[omit as keyof typeof body];
  }

  return { body }
};

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
    return Promise.resolve(Object.assign({}, product, {
      id: 1,
      category: 'any_category',
      unit: 'any_unit',
      supplier: 'any_supplier'
    }));
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
    const httpResponse = await sut.handle(makeFakeRequest('id_category'));
    expect(httpResponse.statusCode).toBe(400);
  })

  it('should return 400 if no unit is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest('id_unit'));
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

    const httpRequest = {
      body: fakeAddProductData()
    }


    await sut.handle(httpRequest);
    expect(createSpy).toHaveBeenCalledWith(fakeAddProductData());
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
    jest.spyOn(createProductUseCaseStub, 'execute').mockReturnValueOnce(Promise.resolve(fakeProductData()));
    const httpResponse = await sut.handle(makeFakeRequest(''));
    expect(httpResponse).toEqual(ok(fakeProductData()));
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