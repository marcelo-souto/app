import { Spinner, SpinnerProps, View } from "tamagui";

const Loading = (props: SpinnerProps) => {
  return <Spinner {...props} />;
};

const LoadingScreen = (props: SpinnerProps) => {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Spinner scale={2} color="#171717" size="large" {...props} />
    </View>
  );
};

export { Loading, LoadingScreen };
