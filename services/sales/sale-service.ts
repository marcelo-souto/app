import { api } from "@/lib/axios/api";
import { Sale } from "@/types/types";

const getAll = async (): Promise<Sale[]> => {
  const response = await api.get("/sales");
  return response.data;
};

const getById = async (id: string): Promise<Sale | undefined> => {
  return await api.get(`/sales/${id}`);
};

const create = async (data: any) => {
  return await api.post("/sales", data);
};

export const saleService = {
  getAll,
  getById,
  create,
};
