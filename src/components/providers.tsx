"use client";

import { Theme } from "@radix-ui/themes";

import { PropsWithChildren } from "react";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Theme
      appearance="dark"
      accentColor="violet"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      radius="large"
    >
      {children}
    </Theme>
  );
};
