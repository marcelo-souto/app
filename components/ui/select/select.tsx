import { AntDesign, Entypo } from "@expo/vector-icons";

import {
  Adapt,
  Select as TSelect,
  Sheet,
  YStack,
  SelectProps as TSelectProps,
  SelectItemProps as TSelectItemProps,
} from "tamagui";

type SelectProps = {
  title: string;
  triggerText: string;
} & TSelectProps;

const Select = ({
  value,
  onValueChange,
  children,
  title,
  triggerText,
  ...props
}: SelectProps) => {
  return (
    <TSelect
      value={value}
      onValueChange={onValueChange}
      disablePreventBodyScroll
    >
      <TSelect.Trigger
        backgroundColor="#171717"
        circular
        justifyContent="center"
        alignItems="center"
      >
        <AntDesign name="adduser" size={24} color="white" />
      </TSelect.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={false}
          modal={true}
          dismissOnSnapToBottom
          unmountChildrenWhenHidden={true}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <TSelect.Content zIndex={200000}>
        <TSelect.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Entypo name="chevron-up" size={16} color="black" />
          </YStack>
        </TSelect.ScrollUpButton>

        <TSelect.Viewport
          animation="quick"
          animateOnly={["transform", "opacity"]}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <TSelect.Group>
            <TSelect.Label>{title}</TSelect.Label>
            {children}
          </TSelect.Group>
        </TSelect.Viewport>

        <TSelect.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Entypo name="chevron-down" size={16} color="black" />
          </YStack>
        </TSelect.ScrollDownButton>
      </TSelect.Content>
    </TSelect>
  );
};

type SelectItemProps = TSelectItemProps;

const SelectItem = ({ children, ...props }: SelectItemProps) => {
  return (
    <TSelect.Item {...props}>
      <TSelect.ItemText>{children}</TSelect.ItemText>
      <TSelect.ItemIndicator marginLeft="auto">
        <Entypo name="check" size={16} color="black" />
      </TSelect.ItemIndicator>
    </TSelect.Item>
  );
};

export { Select, SelectItem };
