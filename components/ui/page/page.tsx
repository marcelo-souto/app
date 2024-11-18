import { SafeAreaView } from "react-native-safe-area-context";
import { YStackProps, YStack, HeadingProps, H1, ScrollView } from "tamagui";

type PageProps = YStackProps;

const Page = ({ children, ...props }: PageProps) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <YStack padding={24} gap={16} {...props}>
          {children}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

type PageTitleProps = HeadingProps;

const PageTitle = ({ children, ...props }: PageTitleProps) => {
  return (
    <H1 fontSize={28} {...props}>
      {children}
    </H1>
  );
};

export { Page, PageTitle };
