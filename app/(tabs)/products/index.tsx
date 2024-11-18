import { useProductGetAllRequest } from "@/hooks/product/product-request";
import { SafeAreaView } from "react-native-safe-area-context";
import { H1, ScrollView, YStack, Text, XStack } from "tamagui";
import { Button } from "@/components/ui/button/button";
import { router } from "expo-router";
import {
  ProductList,
  ProductListItem,
} from "@/components/product-list/product-list";
import { Page } from "@/components/ui/page/page";
import { ResourceHeader, ResourceTitle } from "@/components/resource/resource";

export default function Products() {
  const { data, isLoading, isSuccess, isError } = useProductGetAllRequest();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Page>
      <ResourceHeader>
        <ResourceTitle>Produtos</ResourceTitle>
        <Button onPress={() => router.push("/products/create")}>
          Cadastrar
        </Button>
      </ResourceHeader>

      <ProductList>
        {data?.map((product) => (
          <ProductListItem
            key={product.id}
            onPress={() =>
              router.push({
                pathname: "/products/edit/[id]",
                params: {
                  id: product.id,
                },
              })
            }
            data={product}
          />
        ))}
      </ProductList>
    </Page>
  );
}
