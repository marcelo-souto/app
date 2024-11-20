import { api } from "@/lib/axios/api";
import { Sale } from "@/types/types";

const getAll = async (): Promise<Sale[]> => {
  const response = await api.get("/sales");
  return response.data;
};

const getById = async (id: string): Promise<Sale | undefined> => {
  return await api.get(`/sales/${id}`);
};

type CreateSaleData = {
  customerId: string;
  saleTypeId: string;
  items: {
    id: string;
    quantity: number;
  }[];
};

const create = async (data: CreateSaleData) => {
  return await api.post("/sales", data);
};

export const saleService = {
  getAll,
  getById,
  create,
};
