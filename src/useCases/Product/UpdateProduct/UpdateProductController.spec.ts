import { AddProduct, Product, UpdateProduct } from "../../../entities/Product";
import { IUpdateProductRepository } from "../../../repositories/ProductRepository";
import { MissingParamError } from "../../utils/errors";
import { badRequest, ok } from "../../utils/helpers/httpHelper";
import { UpdateProductController } from "./UpdateProductController";

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

const makeSut = () => {
  class UpdateProductRepositoryStub implements IUpdateProductRepository {
    async update(productId: number, product: UpdateProduct): Promise<Product> {
      const fakeProduct = new Product();
      Object.assign(fakeProduct, { id: productId }, product);
      return fakeProduct;
    }
  }

  class UpdateProductUseCaseStub {
    constructor(private readonly updateProductRepository: IUpdateProductRepository) {}
    async execute(product: UpdateProduct): Promise<Product> {
      return this.updateProductRepository.update(1, product);
    }
  }

  const updateProductRepositoryStub = new UpdateProductRepositoryStub();
  const updateProductUseCaseStub = new UpdateProductUseCaseStub(updateProductRepositoryStub);
  const sut = new UpdateProductController(updateProductUseCaseStub);
  return {
    sut,
    updateProductUseCaseStub,
    updateProductRepositoryStub
  };
}

describe('UpdateProductController', () => {
  it('should return MissingParamError if no id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')));
  })

  it('should return ok if valid id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 1
      },
      body: fakeAddProductData()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(Object.assign(new Product(), fakeAddProductData(), { id: 1 })));
  })

  it('Should return the same id passed as parameter', async () => {
    const { sut, updateProductUseCaseStub } = makeSut()
    const httpRequest = {
      params: {
        id: 1
      },
      body: fakeAddProductData()
    }

    jest.spyOn(updateProductUseCaseStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(Object.assign(new Product(), fakeAddProductData(), { id: 1 })));

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body.id).toBe(1);
  })

  it('Should call UpdateProductUseCase with correct values', async () => {
    const { sut, updateProductUseCaseStub } = makeSut()
    const httpRequest = {
      params: {
        id: 1
      },
      body: fakeAddProductData()
    }

    const executeSpy = jest.spyOn(updateProductUseCaseStub, 'execute');

    await sut.handle(httpRequest)
    expect(executeSpy).toHaveBeenCalledWith(fakeAddProductData(), 1);
  })

  it('Should call UpdateProductRepository with correct values', async () => {
    const { sut, updateProductRepositoryStub } = makeSut()
    const httpRequest = {
      params: {
        id: 1
      },
      body: fakeAddProductData()
    }

    const executeSpy = jest.spyOn(updateProductRepositoryStub, 'update');

    await sut.handle(httpRequest)
    expect(executeSpy).toHaveBeenCalledWith(1, fakeAddProductData());
  })


});