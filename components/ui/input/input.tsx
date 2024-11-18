import {
  Input as TInput,
  InputProps as TInputProps,
  TextArea as TTextArea,
  TextAreaProps as TTextAreaProps,
} from "tamagui";

type InputProps = Omit<TInputProps, "onChange"> & {
  onChange: (value: string) => void;
};

const Input = ({ value, onChange, onBlur, ...props }: InputProps) => {
  return (
    <TInput
      fontSize={24}
      fontWeight={700}
      padding={0}
      borderTopWidth={0}
      borderLeftWidth={0}
      borderRightWidth={0}
      borderColor={"#000000"}
      disabledStyle={{
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: "transparent",
      }}
      focusStyle={{
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: "#000000",
      }}
      focusVisibleStyle={{
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: "#000000",
      }}
      transition="border-color"
      transitionDuration="0.5s"
      borderRadius={0}
      value={value}
      onBlur={onBlur}
      onChangeText={onChange}
      backgroundColor="$colorTransparent"
      {...props}
    />
  );
};

const formatCurrency = (value: string) => {
  const numericValue = value.replace(/\D/g, "");

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(Number(numericValue) / 100);

  return formattedValue;
};

const NumericInput = ({ value, onChange, onBlur, ...props }: InputProps) => {
  return (
    <Input
      value={value}
      onBlur={onBlur}
      keyboardType="numeric"
      onChange={(text) => onChange(formatCurrency(text))}
      {...props}
    />
  );
};

export { Input, NumericInput };
