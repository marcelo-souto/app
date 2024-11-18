import {
  ButtonProps as TButtonProps,
  Button as TButton,
  Spinner,
} from "tamagui";

type ButtonProps = {
  isLoading?: boolean;
} & TButtonProps;

function Button({
  children,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <TButton
      backgroundColor="#171717"
      disabled={isLoading || disabled}
      color="white"
      fontWeight={700}
      animateOnly={["opacity"]}
      disabledStyle={{
        opacity: 0.5,
      }}
      icon={isLoading ? <Spinner color="#FFFFFF" /> : undefined}
      {...props}
    >
      {isLoading ? "" : children}
    </TButton>
  );
}

export { Button };
