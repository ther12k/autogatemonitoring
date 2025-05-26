// File: src/layout/layout.jsx //
// ============================================================ //
import React, { useState } from "react";
import Sidebar from "@/components/custom/Sidebar"; // New shadcn sidebar
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, User as UserIcon } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isAuth, clearAuth } from "@/lib/utils/token";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const TopBar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const userData = isAuth();
  const fullname = userData?.fullname || "User";

  const onLogout = () => {
    Swal.fire({ /* ... (Swal logout logic from Sidebar) ... */
        title: "Logout Confirmation", text: "Are you sure you want to logout?", icon: "warning",
        showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33", confirmButtonText: "Yes, logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({ title: "Logging out...", showConfirmButton: false, didOpen: () => Swal.showLoading() });
          setTimeout(() => { clearAuth(); Swal.close(); navigate("/"); }, 1000);
        }
      });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
        <MenuIcon className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex-1">
        {/* Optional: Breadcrumbs or page title can go here */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt={fullname} /> {/* Replace with actual image or remove src for fallback only */}
              <AvatarFallback>{fullname.substring(0,1).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/profile')}> {/* Assuming /profile route */}
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};


const Layout = () => {
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(prev => !prev);
    } else {
      setIsDesktopSidebarOpen(prev => !prev);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block">
        <Sidebar
          isSidebarOpen={isDesktopSidebarOpen}
          setIsSidebarOpen={setIsDesktopSidebarOpen}
        />
      </div>
      {/* Sidebar Sheet for Mobile */}
      <div className="md:hidden">
        <Sidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />
      </div>

      <div className="flex flex-col flex-1">
        <TopBar onMenuClick={handleMenuToggle} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;