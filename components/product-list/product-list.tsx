import { Product } from "@/types/types";
import { convertToBRL } from "@/utils/functions/convert-to-brl";
import { Card, CardProps, H2, Paragraph, YStack, YStackProps } from "tamagui";

type ProductListProps = YStackProps;

const ProductList = ({ children, ...props }: ProductListProps) => {
  return (
    <YStack gap={24} {...props}>
      {children}
    </YStack>
  );
};

type ProductListItemProps = CardProps & {
  data: Product;
};

const ProductListItem = ({
  children,
  data,
  ...props
}: ProductListItemProps) => {
  return (
    <Card
      elevate
      size={4}
      bordered
      animation="bouncy"
      pressStyle={{
        scale: 0.95,
      }}
      paddingRight={12}
      py={6}
      px={12}
      {...props}
    >
      <Card.Header>
        <H2 fontSize={16} lineHeight="$4">
          {data.name}
        </H2>
        <Paragraph fontSize={14} marginBottom={16} color="#707070">
          {convertToBRL(data.price)}
        </Paragraph>
      </Card.Header>
      <Card.Footer>
        <Paragraph color="#4b4b4b">{data.description}</Paragraph>
      </Card.Footer>
    </Card>
  );
};

export { ProductList, ProductListItem };
