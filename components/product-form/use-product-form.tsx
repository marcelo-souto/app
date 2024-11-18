import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useProductCreateRequest,
  useProductUpdateRequest,
} from "@/hooks/product/product-request";
import { convertToBRL } from "@/utils/functions/convert-to-brl";
import { router } from "expo-router";
import { Product } from "@/types/types";

const productSchema = z.object({
  name: z.string().min(1, "Campo Obrigatório"),
  price: z.string().refine((value) => {
    return parseFloat(value.replace("R$", "").trim().replace(",", ".")) > 0;
  }, "Valor inválido"),
  description: z.string().min(1, "Campo Obrigatório"),
});

type ProductFormValues = z.infer<typeof productSchema>;

const useProductForm = (data?: Product) => {
  const form = useForm<ProductFormValues>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: data?.name || "",
      price: data ? convertToBRL(data.price) : "",
      description: data?.description || "",
    },
  });

  const createProduct = useProductCreateRequest();
  const updateProduct = useProductUpdateRequest();

  const onSubmit = () => {
    const values = form.getValues();

    const dataToBeSent = {
      name: values.name,
      price: parseFloat(
        values.price.replace("R$", "").trim().replace(",", ".")
      ),
      description: values.description,
    };

    if (data) {
      updateProduct.mutate({ id: data.id, data: dataToBeSent });
      return;
    }

    createProduct.mutate(dataToBeSent);
  };

  if (createProduct.isSuccess || updateProduct.isSuccess) {
    router.push("/products");
  }

  const deleteProductById = () => {};

  const isLoading = createProduct.isPending || updateProduct.isPending;

  return { form, onSubmit, isLoading, deleteProductById };
};

export { useProductForm };
