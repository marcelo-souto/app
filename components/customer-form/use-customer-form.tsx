import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useCustomerCreateRequest,
  useCustomerDeleteRequest,
  useCustomerUpdateRequest,
} from "@/hooks/customer/customer-request";
import { router } from "expo-router";
import { Customer } from "@/types/types";

const customerSchema = z.object({
  name: z.string().min(1, "Campo Obrigatório"),
  address: z.string().min(1, "Campo Obrigatório"),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

const useCustomerForm = (data?: Customer) => {
  const form = useForm<CustomerFormValues>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: data?.name || "",
      address: data?.address || "",
    },
  });

  const createCustomer = useCustomerCreateRequest();
  const updateCustomer = useCustomerUpdateRequest();
  const deleteCustomer = useCustomerDeleteRequest();

  const onSubmit = () => {
    const values = form.getValues();

    const dataToBeSent = {
      name: values.name,
      address: values.address,
    };

    if (data) {
      updateCustomer.mutate({ id: data.id, data: dataToBeSent });
      return;
    }

    createCustomer.mutate(dataToBeSent);
  };

  const deleteCustomerById = () => {
    deleteCustomer.mutate(data!.id);
  };

  if (
    createCustomer.isSuccess ||
    updateCustomer.isSuccess ||
    deleteCustomer.isSuccess
  ) {
    router.push("/customers");
  }

  const isLoading =
    createCustomer.isPending ||
    updateCustomer.isPending ||
    deleteCustomer.isPending;

  return {
    form,
    onSubmit,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    deleteCustomerById,
    isLoading,
  };
};

export { useCustomerForm };
