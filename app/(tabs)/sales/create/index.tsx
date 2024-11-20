import { useEffect, useRef, useState } from "react";

import { Page } from "@/components/ui/page/page";
import { H2, H3, Paragraph, ScrollView, Text, XStack, YStack } from "tamagui";

import { useCustomerGetAllRequest } from "@/hooks/customer/customer-request";
import { useProductGetAllRequest } from "@/hooks/product/product-request";
import { useCreateSaleRequest } from "@/hooks/sale/sale-request";

import { ResourceHeader, ResourceTitle } from "@/components/resource/resource";
import { Select, SelectItem } from "@/components/ui/select/select";
import { Customer } from "@/types/types";
import { Sheet, SheetRef } from "@/components/ui/sheet/sheet";
import { Button } from "@/components/ui/button/button";
import { convertToBRL } from "@/utils/functions/convert-to-brl";
import { useCart } from "@/hooks/cart/use-cart";
import { Minus, Plus, Tag } from "@tamagui/lucide-icons";
import { router } from "expo-router";

export default function CreateSale() {
  const cart = useCart();

  const customersRequest = useCustomerGetAllRequest();
  const productsRequest = useProductGetAllRequest();
  const createSaleRequest = useCreateSaleRequest();

  const [customer, setCustomer] = useState<Customer | null>(null);

  const ref = useRef<SheetRef>(null);

  const onCustomerChange = (value: string) => {
    const customer = customersRequest.data?.find((item) => item.id === value);
    setCustomer(customer || null);
  };

  const handleSubmitSale = () => {
    createSaleRequest.mutate({
      customerId: customer?.id || "",
      items: cart.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      saleTypeId: "cd374655-d64b-491c-b504-3d74e354f29d",
    });
  };

  const open = () => ref.current?.open();
  const close = () => ref.current?.close();

  if (createSaleRequest.isSuccess) {
    router.push("/sales");
  }

  useEffect(() => {
    if (createSaleRequest.isSuccess) {
      router.push("/sales");
    }
  }, [createSaleRequest.isSuccess]);

  return (
    <Page>
      <ResourceHeader>
        <ResourceTitle>Novo Pedido</ResourceTitle>
        <XStack gap={4}>
          <Select
            value={customer?.id || ""}
            onValueChange={onCustomerChange}
            title="Clientes"
            triggerText="Adicionar Cliente"
          >
            {customersRequest.data?.map((item, index) => (
              <SelectItem index={index} key={item.name} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </Select>

          <Button circular onPress={open}>
            <Tag size={18} color="#FFFFFF" />
          </Button>
        </XStack>
      </ResourceHeader>

      <Sheet ref={ref}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap={12}>
            {productsRequest.data?.map((item) => (
              <YStack
                key={item.id}
                borderColor="#e7e7e7"
                borderWidth={1}
                borderRadius={12}
                py={16}
                px={16}
                gap={8}
                onPress={() => {
                  cart.addToCart(item);
                  close();
                }}
              >
                <H3 fontSize={18} lineHeight={18}>
                  {item.name}
                </H3>
                <Paragraph lineHeight={14} color="#686868">
                  {convertToBRL(item.price)}
                </Paragraph>
              </YStack>
            ))}
          </YStack>
        </ScrollView>
      </Sheet>

      <YStack gap={8}>
        <H2 fontSize={24}>Resumo do Pedido</H2>

        {customer && <Paragraph>Cliente: {customer.name}</Paragraph>}

        {cart.items.length > 0 ? (
          <YStack gap={8}>
            {cart.items.map((item) => (
              <XStack
                key={item.id}
                borderColor="#d8d8d8"
                borderWidth={1}
                borderRadius={12}
                py={16}
                px={16}
                gap={6}
                justifyContent="space-between"
              >
                <YStack gap={8}>
                  <H3 fontSize={18} lineHeight={18} maxWidth={180}>
                    {item.name}
                  </H3>
                  <YStack gap={4}>
                    <Paragraph lineHeight={12} fontSize={12}>
                      Preço Unit: {convertToBRL(item.price)}
                    </Paragraph>
                    <Paragraph lineHeight={12} fontSize={12}>
                      Total: {convertToBRL(item.total)}
                    </Paragraph>
                  </YStack>
                </YStack>

                <XStack alignItems="center">
                  <Button
                    size={24}
                    marginRight={8}
                    circular
                    icon={<Minus />}
                    onPress={() => {
                      cart.removeFromCart(item.id);
                    }}
                  />

                  <Text fontSize={16} fontWeight={700}>
                    {item.quantity}
                  </Text>

                  <Button
                    size={24}
                    marginLeft={8}
                    circular
                    icon={<Plus />}
                    onPress={() => {
                      cart.addToCart(item);
                    }}
                  />
                </XStack>
              </XStack>
            ))}

            <Paragraph textAlign="right">
              Total: {convertToBRL(cart.total)}
            </Paragraph>
          </YStack>
        ) : (
          <Paragraph color="#888888" fontSize={14}>
            Nenhum produto adicionado ainda
          </Paragraph>
        )}
        <Button
          marginTop={32}
          disabled={!customer || cart.items.length === 0}
          isLoading={createSaleRequest.isPending}
          onPress={handleSubmitSale}
        >
          Finalizar Pedido
        </Button>
      </YStack>
    </Page>
  );
}
