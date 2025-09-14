import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./Header";
import { AppSidebar } from "./AppSidebar";

interface LayoutProps {
  children: ReactNode;
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  onLogout: () => void;
}

export function Layout({ children, user, onLogout }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header user={user} onLogout={onLogout} />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}