import { AddProduct, Product, UpdateProduct } from "../../../entities/Product";
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
  class UpdateProductUseCaseStub {
    async execute(product: UpdateProduct): Promise<Product> {
      return Promise.resolve(Object.assign(new Product(), product, { id: 1 }));
    }
  }

  const updateProductUseCaseStub = new UpdateProductUseCaseStub();
  const sut = new UpdateProductController(updateProductUseCaseStub);
  return {
    sut,
    updateProductUseCaseStub
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

});