import { Customer, Product } from "@/types/types";
import { Card, CardProps, H2, Paragraph, YStack, YStackProps } from "tamagui";

type CustomerListProps = YStackProps;

const CustomerList = ({ children, ...props }: CustomerListProps) => {
  return (
    <YStack gap={24} {...props}>
      {children}
    </YStack>
  );
};

type CustomerListItemProps = CardProps & {
  data: Customer;
};

const CustomerListItem = ({
  children,
  data,
  ...props
}: CustomerListItemProps) => {
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
      </Card.Header>
      <Card.Footer>
        <Paragraph color="#4b4b4b">{data.address}</Paragraph>
      </Card.Footer>
    </Card>
  );
};

export { CustomerList, CustomerListItem };
