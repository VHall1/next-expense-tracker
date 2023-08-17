"use client";

import { Button, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import { useState, useTransition } from "react";

export function Form({
  handleSubmit,
  type,
}: {
  handleSubmit: (e: FormData) => Promise<{ error?: string } | undefined>;
  type: "signin" | "signup";
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  let title = "Authenticate";
  if (type === "signin") {
    title = "Sign in";
  } else if (type === "signup") {
    title = "Sign up";
  }

  return (
    <form
      action={async (e) => {
        const response = await handleSubmit(e);
        startTransition(() => {
          if (response?.error) {
            setError(response.error);
          } else {
            setError(null);
          }
        });
      }}
    >
      <h3 className="text-xl font-medium">{title}</h3>
      <div className="mt-4">
        <label htmlFor="email">Email</label>
        <TextFieldRoot>
          <TextFieldInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </TextFieldRoot>
      </div>

      <div className="mt-4">
        <label htmlFor="password">Password</label>
        <TextFieldRoot>
          <TextFieldInput
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </TextFieldRoot>
      </div>

      {error ? (
        <p className="text-xs text-center pt-4 text-red-500">{error}</p>
      ) : null}

      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isPending}>
          {title}
        </Button>
      </div>
    </form>
  );
}
