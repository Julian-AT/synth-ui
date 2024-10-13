import Sidebar from "@/components/sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <div className="min-h-full w-full overflow-hidden">{children}</div>
    </div>
  );
}
