import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../react-query/react-query";
import { TamaguiProvider } from "tamagui";
import appConfig from "@/tamagui.config";

type ProvidersProps = React.PropsWithChildren<{}>;

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <TamaguiProvider config={appConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TamaguiProvider>
  );
};
