import { IHttpRequest } from "../../Presentation/Protocols/http";
import { CreateProductController } from "./CreateProductController";

const makeFakeRequest = (omit: string): IHttpRequest => {

  const body = {
    name: 'any_name',
    cost: 10,
    price: 20,
    quantity: 30,
    barcode: 'any_barcode',
    description: 'any_description',
    category: 'any_category',
    unit: 'any_unit',
    expirationDate: 'any_expirationDate',
    providerCode: 'any_providerCode',
    ean: 'any_ean',
    ncm: 'any_ncm',
    cest: 'any_cest',
    origin: 'any_origin',
    liquidWeight: 40,
    bruteWeight: 50,
    width: 50,
    height: 60,
    length: 70,
  }

  if (omit) {
    delete body[omit as keyof typeof body];
  }

  return { body }
};

const makeSut = () => {
  const sut = new CreateProductController();
  return { sut };
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
})