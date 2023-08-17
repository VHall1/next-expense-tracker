export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="max-w-sm w-full px-4 m-auto">{children}</div>
    </div>
  );
}
