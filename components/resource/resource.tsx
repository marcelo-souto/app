import { createContext, useContext } from "react";
import {
  XStackProps,
  XStack,
  Button,
  ButtonProps,
  ScrollView,
  ScrollViewProps,
  HeadingProps,
  H1,
} from "tamagui";

type ResourceProviderProps = {
  mode?: "create" | "edit";
} & React.PropsWithChildren<{}>;

const ResourceContext = createContext({} as ResourceProviderProps);

const Resource = ({ children, ...props }: ResourceProviderProps) => {
  return (
    <ResourceContext.Provider
      value={{
        ...props,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

const useResource = () => {
  const context = useContext(ResourceContext);

  if (context === undefined) {
    throw new Error("useResource must be used within a ResourceProvider");
  }

  return context;
};

type ResourceTitleProps = HeadingProps;

const ResourceTitle = ({ children, ...props }: ResourceTitleProps) => {
  const { mode } = useResource();

  return (
    <H1 fontSize={28} {...props}>
      {mode === "create" && !children && "Cadastrar"}
      {mode === "edit" && !children && "Editar"}
      {children}
    </H1>
  );
};

type ResourceHeaderProps = XStackProps;

const ResourceHeader = ({ children, ...props }: ResourceHeaderProps) => {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      marginBottom={0}
      {...props}
    >
      {children}
    </XStack>
  );
};

type ResourceControlsProps = XStackProps;

const ResourceControls = ({ children, ...props }: ResourceControlsProps) => {
  
  const { mode } = useResource();
  if (!mode || mode === "create") return null;

  return (
    <XStack gap={8} {...props}>
      {children}
    </XStack>
  );
};

type ResourceEditControlProps = ButtonProps;

const ResourceEditControl = ({
  children,
  ...props
}: ResourceEditControlProps) => {
  return (
    <Button
      backgroundColor="$blue5"
      color="$blue10"
      size={28}
      fontSize={12}
      fontWeight={700}
      {...props}
    >
      {children ? children : "Editar"}
    </Button>
  );
};

type ResourceDeleteControlProps = ButtonProps;

const ResourceDeleteControl = ({
  children,
  ...props
}: ResourceDeleteControlProps) => {
  return (
    <Button
      backgroundColor="$red5"
      color="$red10"
      size={28}
      fontSize={12}
      fontWeight={700}
      {...props}
    >
      {children ? children : "Excluir"}
    </Button>
  );
};

export {
  ResourceHeader,
  ResourceControls,
  ResourceEditControl,
  ResourceDeleteControl,
  ResourceTitle,
  Resource,
};
