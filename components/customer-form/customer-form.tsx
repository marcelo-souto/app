import { H1, H2, XStack, YStack, Text } from "tamagui";
import { Input } from "@/components/ui/input/input";
import { Customer } from "@/types/types";
import { Button } from "@/components/ui/button/button";
import { useCustomerForm } from "./use-customer-form";
import { Fragment, useState } from "react";
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

type CustomerFormProps = {
  data?: Customer;
  mode: "create" | "edit";
};

const CustomerForm = ({ data, mode = "create" }: CustomerFormProps) => {
  const { form, onSubmit, deleteCustomerById, isLoading } =
    useCustomerForm(data);
  const [editEnabled, setEditEnabled] = useState(false);
  const handleEdit = () => setEditEnabled(!editEnabled);

  return (
    <Fragment>
      <Resource mode={mode}>
        <ResourceHeader>
          <ResourceTitle />
          <ResourceControls>
            <ResourceEditControl onPress={handleEdit} disabled={isLoading} />
            <ResourceDeleteControl
              onPress={deleteCustomerById}
              disabled={isLoading}
            />
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira um endereço."
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

export { CustomerForm };
