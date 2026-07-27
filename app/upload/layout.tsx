import AuthGuard from "@/app/components/AuthGuard";

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
