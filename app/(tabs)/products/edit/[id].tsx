import { LoadingScreen } from "@/components/loading/loading";
import { ProductForm } from "@/components/product-form/product-form";
import { Page } from "@/components/ui/page/page";
import { useProductGetByIdRequest } from "@/hooks/product/product-request";
import { useLocalSearchParams } from "expo-router";
import { Text } from "tamagui";

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useProductGetByIdRequest(id as string);

  if (isLoading) return <LoadingScreen />;
  return (
    <Page>
      <ProductForm key={data?.id} data={data} mode="edit" />
    </Page>
  );
}
