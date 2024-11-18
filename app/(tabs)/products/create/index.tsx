import { ProductForm } from "@/components/product-form/product-form";
import { Page } from "@/components/ui/page/page";

export default function CreateProduct() {
  return (
    <Page>
      <ProductForm mode="create" />
    </Page>
  );
}
