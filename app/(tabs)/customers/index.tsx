import {
  CustomerList,
  CustomerListItem,
} from "@/components/customer-list/customer-list";
import { Loading, LoadingScreen } from "@/components/loading/loading";
import { ResourceHeader } from "@/components/resource/resource";
import { Button } from "@/components/ui/button/button";
import { Page, PageTitle } from "@/components/ui/page/page";
import { useCustomerGetAllRequest } from "@/hooks/customer/customer-request";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { H1, ScrollView, Text, XStack, YStack } from "tamagui";

export default function Customers() {
  
  const { data, isLoading, isError } = useCustomerGetAllRequest();

  if (isLoading) return <LoadingScreen />;

  return (
    <Page>
      <ResourceHeader>
        <PageTitle>Clientes</PageTitle>
        <Button onPress={() => router.push("/customers/create")}>
          Cadastrar
        </Button>
      </ResourceHeader>

      <CustomerList>
        {data?.map((customer) => (
          <CustomerListItem
            key={customer.id}
            onPress={() =>
              router.push({
                pathname: "/customers/edit/[id]",
                params: {
                  id: customer.id,
                },
              })
            }
            data={customer}
          />
        ))}
      </CustomerList>
    </Page>
  );
}
