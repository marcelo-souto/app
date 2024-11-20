import { H1, H2, XStack, YStack, Text } from "tamagui";
import { Input } from "@/components/ui/input/input";
import { Customer, Sale } from "@/types/types";
import { Button } from "@/components/ui/button/button";
import { useCustomerForm } from "./use-customer-form";
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
import {
  SaleList,
  SaleListItem,
  SaleListItemProducts,
} from "../sale-list/sale-list";

type CustomerFormProps = {
  data?: Customer & { sales: Sale[] };
  mode: "create" | "edit";
};

const CustomerForm = ({ data, mode = "create" }: CustomerFormProps) => {
  const { form, onSubmit, deleteCustomerById, isLoading } =
    useCustomerForm(data);
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
            <ResourceDeleteControl
              onPress={deleteCustomerById}
              disabled={isLoading}
            />
          </ResourceControls>
        </ResourceHeader>

        <Form {...form}>
          <YStack>
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
                  <FormLabel>Endereço:</FormLabel>
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
          </YStack>
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

        {mode === "edit" && (
          <YStack>
            <H2 fontSize={28} marginBottom={24} marginTop={24}>
              Pedidos
            </H2>
            {data && data.sales.length > 0 ? (
              <SaleList>
                {data?.sales.map((sale) => (
                  <SaleListItem
                    key={sale.id}
                    title={data.name}
                    type={sale.saleType.name}
                  >
                    <SaleListItemProducts products={sale.items} />
                  </SaleListItem>
                ))}
              </SaleList>
            ) : (
              <Text color="#848484" textAlign="center">
                Nenhum pedido encontrado.
              </Text>
            )}
          </YStack>
        )}
      </Resource>
    </Fragment>
  );
};

export { CustomerForm };
