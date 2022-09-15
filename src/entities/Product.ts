export class Product {
  id: number;
  name: string;
  cost: number;
  price: number;
  quantity: number;
  barcode: string;
  description: string;
  id_category: number;
  category: string;
  id_unit: number;
  unit: string;
  expirationDate: Date;
  id_supplier: number;
  supplier: string;
  liquidWeight: number;
  bruteWeight: number;
  width: number;
  height: number;
  length: number;
}

export class AddProduct {
  name: string;
  cost: number;
  price: number;
  quantity: number;
  barcode: string;
  description: string;
  id_category: number;
  id_unit: number;
  expirationDate: Date;
  id_supplier: number;
  liquidWeight: number;
  bruteWeight: number;
  width: number;
  height: number;
  length: number;
}