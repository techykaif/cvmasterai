import AuthGuard from "@/app/components/AuthGuard";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
