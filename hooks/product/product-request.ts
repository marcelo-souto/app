import { productService } from "@/services/products/product-service";
import { Product } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useProductGetAllRequest = () => {
  const query = useQuery({
    queryKey: ["get-all-products"],
    queryFn: productService.getAll,
  });

  return query;
};

export const useProductGetByIdRequest = (id: string) => {
  const query = useQuery({
    queryKey: ["get-product-by-id", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });

  return query;
};

export const useProductCreateRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-product"],
    mutationFn: productService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-products"],
      });
    },
  });

  return mutation;
};

export const useProductUpdateRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-product"],
    mutationFn: ({ id, data }: { id: string; data: Omit<Product, "id"> }) =>
      productService.update(id, data),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["get-product-by-id", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-sales"],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    },
  });

  return mutation;
};
