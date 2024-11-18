import { CustomerForm } from "@/components/customer-form/customer-form";
import { Page } from "@/components/ui/page/page";
import { SafeAreaView } from "react-native-safe-area-context";
import { H1, YStack } from "tamagui";

export default function CreateCustomer() {
  return (
    <Page>
      <CustomerForm mode="create" />
    </Page>
  );
}
