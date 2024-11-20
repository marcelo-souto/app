import { saleService } from "@/services/sales/sale-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSaleGetAllRequest = () => {
  const query = useQuery({
    queryKey: ["get-all-sales"],
    queryFn: saleService.getAll,
  });

  return query;
};

export const useCreateSaleRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-sale"],
    mutationFn: saleService.create,

    onSuccess: (_, { customerId }) => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-sales"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-customer-by-id", customerId],
      });
    },
  });

  return mutation;
};
