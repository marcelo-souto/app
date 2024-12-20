import { CustomerForm } from "@/components/customer-form/customer-form";
import { LoadingScreen } from "@/components/loading/loading";
import { Page } from "@/components/ui/page/page";
import { useCustomerGetByIdRequest } from "@/hooks/customer/customer-request";
import { useLocalSearchParams } from "expo-router";
import { Text } from "tamagui";

export default function EditCustomer() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useCustomerGetByIdRequest(id as string);

  if (isLoading) return <LoadingScreen />;
  return (
    <Page>
      <CustomerForm key={data?.id} data={data} mode="edit" />
    </Page>
  );
}
