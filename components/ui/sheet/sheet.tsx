import { ChevronDown } from "lucide-react-native";
import React, { useImperativeHandle, useState } from "react";
import { Button, Sheet as TSheet, SheetProps as TSheetProps } from "tamagui";

type SheetProps = TSheetProps;

export type SheetRef = {
  open: () => void;
  close: () => void;
};

const Sheet = React.forwardRef<SheetRef, SheetProps>((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  return (
    <TSheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      snapPoints={[600, 600]}
      snapPointsMode={"constant"}
      zIndex={100_000}
      dismissOnSnapToBottom={true}
      unmountChildrenWhenHidden={true}
      {...props}
    >
      <TSheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <TSheet.Handle />
      <TSheet.Frame padding={16}>{props.children}</TSheet.Frame>
    </TSheet>
  );
});

export { Sheet };
