"use client";

import { Button, Link, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import { useState, useTransition } from "react";
import NextLink from "next/link";

export function Form({
  handleSubmit,
  type,
}: {
  handleSubmit: (e: FormData) => Promise<{ error?: string } | undefined>;
  type: "signin" | "signup";
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  let link: string | undefined;
  let linkTitle: string | undefined;
  let title = "Authenticate";
  if (type === "signin") {
    title = "Sign in";
    link = "/auth/signup";
    linkTitle = "Don't have an account?";
  } else if (type === "signup") {
    title = "Sign up";
    link = "/auth/signin";
    linkTitle = "Already have an account?";
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
      <h3 className="text-2xl text-center font-medium">{title}</h3>
      <div className="mt-6">
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

      <Button className="mt-4 w-full" type="submit" disabled={isPending}>
        {title}
      </Button>

      {link ? (
        <div className="text-xs text-center mt-4">
          <Link asChild>
            <NextLink href={link}>{linkTitle}</NextLink>
          </Link>
        </div>
      ) : null}
    </form>
  );
}
