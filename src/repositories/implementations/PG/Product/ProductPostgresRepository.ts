import { AddProduct, Product } from "../../../../entities/Product";
import { ICreateProductRepository, IGetProductRepository, IListProductsRepository } from "../../../ProductRepository";
import pghelper from "../helpers/pg_helper";


export class ProductPostgresRepository implements ICreateProductRepository, IGetProductRepository, IListProductsRepository {
  async create(data: AddProduct): Promise<Product> {

    await pghelper.connect();

    const res = await pghelper.query(
      `
      INSERT INTO PRODUCTS(
        NAME
       ,COST
       ,PRICE
       ,QUANTITY
       ,BARCODE
       ,DESCRIPTION
       ,CATEGORY
       ,UNIT
       ,EXPIRATIONDATE
       ,PROVIDERCODE
       ,EAN
       ,NCM
       ,CEST
       ,ORIGIN
       ,LIQUIDWEIGHT
       ,BRUTEWEIGHT
       ,WIDTH
       ,HEIGHT
       ,LENGTH
       ) VALUES(
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
       ) RETURNING *;
      `, [data.name
      , data.cost
      , data.price
      , data.quantity
      , data.barcode
      , data.description
      , data.category
      , data.unit
      , data.expirationDate
      , data.providerCode
      , data.ean
      , data.ncm
      , data.cest
      , data.origin
      , data.liquidWeight
      , data.bruteWeight
      , data.width
      , data.height
      , data.length
    ]);

    const newProduct = new Product();
    Object.assign(newProduct, res.rows[0]);

    await pghelper.disconnect();
    return newProduct;
  }

  async get(id: number): Promise<Product> {
    await pghelper.connect();

    const res = await pghelper.query(
      `
      SELECT * FROM PRODUCTS WHERE ID = $1;
      `, [id]);


    if (res.rowCount === 0) {
      return null as unknown as Product;
    } else {
      const product = new Product();
      Object.assign(product, res.rows[0]);

      await pghelper.disconnect();
      return product || null;
    }
  }

  async list(currentPage: number, itemsPerPage: number): Promise<Product[]> {
    await pghelper.connect();

    const res = await pghelper.query(
      `
      SELECT * FROM PRODUCTS LIMIT $1 OFFSET $2 ;
      `, [itemsPerPage, (currentPage - 1) * itemsPerPage]);


    const products = res.rows.map((row) => {
      const product = new Product();
      Object.assign(product, row);
      return product;
    });

    await pghelper.disconnect();
    return products;
  }
}
