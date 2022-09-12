import { ProductPostgresRepository } from "../Repositories/ProductPostgresRepository";
import { AddProduct, Product } from "../../../../entities/Product";

function makeSut() {
  class ProductPostgresRepositoryStub implements ProductPostgresRepository {
    async create(data: AddProduct): Promise<Product> {
      const newProduct = new Product();
      Object.assign(newProduct, { id: 1 }, data);
      return newProduct;
    }

    async get(id: number): Promise<Product> {
      const product = new Product();
      Object.assign(product, { id: id });
      return product;
    }
  }

  const sut = new ProductPostgresRepositoryStub();
  return { sut };
}

const fakeProduct = (): AddProduct => {
  return {
    name: "any_name",
    cost: 1,
    price: 1,
    quantity: 1,
    barcode: "any_barcode",
    description: "any_description",
    category: 1,
    unit: 1,
    expirationDate: new Date(2023, 1, 1, 1, 1, 1, 1),
    providerCode: 1,
    ean: "any_ean",
    ncm: "any_ncm",
    cest: "any_cest",
    origin: "any_origin",
    liquidWeight: 1,
    bruteWeight: 1,
    width: 1,
    height: 1,
    length: 1,
  };
}

describe('Product Postgres Repository', () => {
  it('Should return a product on success', async () => {
    const { sut } = makeSut();
    const product = await sut.create(fakeProduct());
    expect(product).toEqual({ id: 1, ...fakeProduct() });
  });

  it('should be able to create a new product', async () => {
    const { sut } = makeSut();
    const product = await sut.create(fakeProduct());
    expect(product).toHaveProperty('id');
  });

  it('returned ID should have the same value as the one passed in', async () => {
    const { sut } = makeSut();
    const product = await sut.get(1);
    expect(product.id).toBe(1);
  });
})