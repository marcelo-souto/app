import { customerService } from "@/services/customers/customer-service";
import { Customer } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCustomerGetAllRequest = () => {
  const query = useQuery({
    queryKey: ["get-all-customers"],
    queryFn: customerService.getAll,
  });

  return query;
};

export const useCustomerGetByIdRequest = (id: string) => {
  const query = useQuery({
    queryKey: ["get-customer-by-id", id],
    queryFn: () => customerService.getById(id),
    enabled: !!id,
  });

  return query;
};

export const useCustomerCreateRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-customer"],
    mutationFn: customerService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-customers"],
      });
    },
  });

  return mutation;
};

export const useCustomerUpdateRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-customer"],
    mutationFn: ({ id, data }: { id: string; data: Omit<Customer, "id"> }) =>
      customerService.update(id, data),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["get-customer-by-id", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-customers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-sales"],
      });
    },
  });

  return mutation;
};

export const useCustomerDeleteRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-customer"],
    mutationFn: customerService.delete,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-customers"],
      });
      queryClient.removeQueries({
        queryKey: ["get-customer-by-id", id],
      });
    },
  });

  return mutation;
};
