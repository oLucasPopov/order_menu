import { AddProduct, Product } from "../../../entities/Product";
import { CreateProductUseCase } from "./CreateProductUseCase";

const makeSut = () => {
  class ProductRepositoryStub {
    async create(product: AddProduct): Promise<Product> {
      return Promise.resolve(Object.assign({ id: 1 }, product));
    }
  }

  const productRepositoryStub = new ProductRepositoryStub();
  const sut = new CreateProductUseCase(productRepositoryStub);
  return {
    sut,
    productRepositoryStub,
  };

}

describe('Create Product UseCase', () => {
  it('Should have property ID after creating product', async () => {
    const { sut } = makeSut();
    const product = await sut.execute({
      name: 'any_name',
      cost: 1,
      price: 1,
      quantity: 1,
      description: 'any_description',
      category: 'any_category',
      unit: 'any_unit',
    });
    expect(product).toHaveProperty('id');
  });

  it('Should return correct values after creating product', async () => {
    const { sut } = makeSut();
    const product = await sut.execute({
      name: 'any_name',
      cost: 1,
      price: 1,
      quantity: 1,
      description: 'any_description',
      category: 'any_category',
      unit: 'any_unit',
    });
    expect(product).toEqual({
      id: 1,
      name: 'any_name',
      cost: 1,
      price: 1,
      quantity: 1,
      description: 'any_description',
      category: 'any_category',
      unit: 'any_unit',
    });
  });
});