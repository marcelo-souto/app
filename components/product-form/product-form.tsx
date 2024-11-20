import { Input, NumericInput } from "@/components/ui/input/input";
import { Product } from "@/types/types";
import { Button } from "@/components/ui/button/button";
import { useProductForm } from "./use-product-form";
import { Fragment, useEffect, useState } from "react";
import {
  Resource,
  ResourceControls,
  ResourceDeleteControl,
  ResourceEditControl,
  ResourceHeader,
  ResourceTitle,
} from "../resource/resource";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form/form";

type ProductFormProps = {
  data?: Product;
  mode: "create" | "edit";
};

const ProductForm = ({ data, mode = "create" }: ProductFormProps) => {
  const { form, onSubmit, isLoading, deleteProductById } = useProductForm(data);

  const [editEnabled, setEditEnabled] = useState(false);
  const handleEdit = () => setEditEnabled(!editEnabled);

  useEffect(() => {
    if (mode === "create") setEditEnabled(true);
  }, [editEnabled]);

  return (
    <Fragment>
      <Resource mode={mode}>
        <ResourceHeader>
          <ResourceTitle />
          <ResourceControls>
            <ResourceEditControl onPress={handleEdit} disabled={isLoading} />
          </ResourceControls>
        </ResourceHeader>

        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira o nome do produto."
                    disabled={!editEnabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço:</FormLabel>
                <FormControl>
                  <NumericInput
                    {...field}
                    placeholder="R$ 0,00"
                    disabled={!editEnabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira uma descrição."
                    disabled={!editEnabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>

        {(editEnabled || mode === "create") && (
          <Button
            isLoading={isLoading}
            disabled={!form.formState.isValid}
            onPress={form.handleSubmit(onSubmit)}
          >
            Enviar
          </Button>
        )}
      </Resource>
    </Fragment>
  );
};

export { ProductForm };
