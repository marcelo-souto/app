import { Text } from "@tamagui/core";

import { useSaleGetAllRequest } from "@/hooks/sale/sale-request";
import { SafeAreaView } from "react-native-safe-area-context";
import { H1, ScrollView, YStack } from "tamagui";
import {
  SaleList,
  SaleListItem,
  SaleListItemProducts,
} from "@/components/sale-list/sale-list";
import { Page } from "@/components/ui/page/page";
import { ResourceHeader, ResourceTitle } from "@/components/resource/resource";
import { Button } from "@/components/ui/button/button";
import { router } from "expo-router";

export default function Sales() {
  const { data, isLoading, isSuccess, isError } = useSaleGetAllRequest();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Page>
      <ResourceHeader>
        <ResourceTitle>Pedidos</ResourceTitle>
        <Button onPress={() => router.push("/sales/create")}>Cadastrar</Button>
      </ResourceHeader>
      <SaleList>
        {data?.map((sale) => (
          <SaleListItem
            key={sale.id}
            title={sale.customer.name}
            type={sale.saleType.name}
          >
            <SaleListItemProducts products={sale.items} />
          </SaleListItem>
        ))}
      </SaleList>
    </Page>
  );
}
