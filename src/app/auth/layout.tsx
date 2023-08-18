import { Card } from "@radix-ui/themes";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Card className="max-w-sm w-full p-4 m-auto">{children}</Card>
    </div>
  );
}
