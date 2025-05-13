
import { Link, useLocation } from "react-router-dom";
import { UploadCloud, Receipt, User, LogOut, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate logout - remove this with actual auth logout
    localStorage.removeItem("isLoggedIn");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-full">
            <Receipt className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">Receipt Scanner</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              isActive={isActive("/")}
              tooltip="Dashboard"
            >
              <Link to="/" className="group">
                <div className={cn(
                  "p-2 rounded-full transition-colors",
                  isActive("/") ? "bg-primary text-white" : "group-hover:bg-primary/10"
                )}>
                  <Home className="h-5 w-5" />
                </div>
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              isActive={isActive("/upload")}
              tooltip="Upload Receipt"
            >
              <Link to="/upload" className="group">
                <div className={cn(
                  "p-2 rounded-full transition-colors",
                  isActive("/upload") ? "bg-primary text-white" : "group-hover:bg-primary/10"
                )}>
                  <UploadCloud className="h-5 w-5" />
                </div>
                <span>Upload Receipt</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              isActive={isActive("/profile")}
              tooltip="Profile"
            >
              <Link to="/profile" className="group">
                <div className={cn(
                  "p-2 rounded-full transition-colors",
                  isActive("/profile") ? "bg-primary text-white" : "group-hover:bg-primary/10"
                )}>
                  <User className="h-5 w-5" />
                </div>
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start group hover:bg-destructive/10" 
          onClick={handleLogout}
        >
          <div className="p-2 rounded-full group-hover:bg-destructive/10">
            <LogOut className="h-5 w-5 text-destructive" />
          </div>
          <span className="text-destructive">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <header className="border-b p-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <SidebarTrigger />
              <div className="ml-auto"></div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
