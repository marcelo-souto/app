import { api } from "@/lib/axios/api";
import { Customer } from "@/types/types";

const getAll = async (): Promise<Customer[]> => {
  const response = await api.get("/customers");
  return response.data;
};

const getById = async (id: string): Promise<Customer | undefined> => {
  const reponse = await api.get(`/customers/${id}`);
  return reponse.data;
};

const create = async (data: Omit<Customer, "id">) => {
  const response = await api.post("/customers", data);
  return response.data;
};

const update = async (id: string, data: Omit<Customer, "id">) => {
  const response = await api.put(`/customers/${id}`, data);
  return response.data;
};

const cancel = async (id: string) => {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
};

export const customerService = {
  getAll,
  getById,
  create,
  update,
  delete: cancel,
};
