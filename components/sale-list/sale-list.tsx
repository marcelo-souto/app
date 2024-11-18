import { Product, SaleItem } from "@/types/types";
import { convertToBRL } from "@/utils/functions/convert-to-brl";
import { H3 } from "tamagui";
import { XStack } from "tamagui";
import { GroupProps, YGroup } from "tamagui";
import { Card, CardProps, H2, Paragraph, YStack, YStackProps } from "tamagui";

type SaleListProps = YStackProps;

const SaleList = ({ children, ...props }: SaleListProps) => {
  return (
    <YStack gap={24} {...props}>
      {children}
    </YStack>
  );
};

type SaleListItemProps = CardProps & {
  title: string;
  type: string;
};

const SaleListItem = ({
  children,
  title,
  type,
  ...props
}: SaleListItemProps) => {
  return (
    <Card
      elevate
      size={4}
      bordered
      animation="bouncy"
      pressStyle={{
        scale: 0.95,
      }}
      {...props}
    >
      <Card.Header
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingTop={6}
        paddingBottom={6}
        paddingLeft={12}
        paddingRight={12}
      >
        <H2 fontSize={16} lineHeight="$6">
          {type}
        </H2>
        <Paragraph fontSize={16}>{title}</Paragraph>
      </Card.Header>
      <Card.Footer>{children}</Card.Footer>
    </Card>
  );
};

type SaleListItemProductsProps = GroupProps & { products: SaleItem[] };

const SaleListItemProducts = ({
  products,
  children,
  ...props
}: SaleListItemProductsProps) => {
  const total = products.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  return (
    <YGroup
      bordered
      borderColor="#e9e9e9"
      borderRightWidth={0}
      borderBottomWidth={0}
      borderLeftWidth={0}
      borderRadius={0}
      {...props}
    >
      {products.map((item) => (
        <YGroup.Item key={item.id}>
          <XStack
            justifyContent="space-between"
            width="100%"
            px={14}
            paddingTop={4}
            paddingBottom={4}
          >
            <Paragraph>x{item.quantity}</Paragraph>
            <YStack alignItems="flex-end">
              <H3 fontSize={14} fontWeight={700} lineHeight="$2">
                {item.product.name}
              </H3>
              <Paragraph fontSize={12} color="#707070">
                {convertToBRL(item.unitPrice)}
              </Paragraph>
            </YStack>
          </XStack>
        </YGroup.Item>
      ))}
      <YGroup.Item>
        <XStack justifyContent="space-between" width="100%" px={14} py={8}>
          <Paragraph>Total</Paragraph>
          <YStack alignItems="flex-end">
            <Paragraph fontSize={14} fontWeight={700} lineHeight="$2">
              {convertToBRL(total)}
            </Paragraph>
          </YStack>
        </XStack>
      </YGroup.Item>
    </YGroup>
  );
};

export { SaleList, SaleListItem, SaleListItemProducts };
