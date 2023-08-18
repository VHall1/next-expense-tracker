"use client";

import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useTransition } from "react";
import { handleLogout } from "./action";

export const Dropdown = ({ userEmail }: { userEmail: string }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" color="gray">
          {userEmail}
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => startTransition(() => handleLogout())}
        >
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
