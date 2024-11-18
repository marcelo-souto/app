import { api } from "@/lib/axios/api";
import { Product } from "@/types/types";

const getAll = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

const getById = async (id: string): Promise<Product | undefined> => {
  const reponse = await api.get(`/products/${id}`);
  return reponse.data;
};

const create = async (data: Omit<Product, "id">) => {
  const response = await api.post("/products", data);
  return response.data;
};

const update = async (id: string, data: Omit<Product, "id">) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const productService = {
  getAll,
  getById,
  create,
  update,
};
