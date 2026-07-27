import AuthGuard from "@/app/components/AuthGuard";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
