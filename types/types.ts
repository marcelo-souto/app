export type Sale = {
  id: string;
  date: string;
  total: number;
  items: SaleItem[];
  customer: Customer;
  saleType: SaleType;
};
export type SaleItem = {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type Customer = {
  id: string;
  name: string;
  address: string;
};

export type SaleType = {
  id: string;
  name: string;
};
