export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-sm mx-auto px-4 pt-24">{children}</div>;
}
