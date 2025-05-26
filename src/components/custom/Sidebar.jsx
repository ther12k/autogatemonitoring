// File: src/components/specialized/Sidebar.jsx //
// ============================================================ //
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ChevronDown, LogOut, Menu as MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
// import logo from "../../assets/indocement.png"; // Ensure path is correct
// import userPlaceholder from "../../assets/logout.png"; // Assuming logout.png is a user placeholder
import { menuItems } from "@/lib/utils/menuItems"; // Adjust import path as needed
import { clearAuth, isAuth } from "@/lib/utils/token"; // Adjust import path as needed
import Swal from "sweetalert2";

const SidebarLink = ({ item, activeMenu, handleMenuClick, isSidebarOpen }) => {
  const isActive = activeMenu === item.key;
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start text-sm h-10 mb-1",
        !isSidebarOpen && "justify-center",
        isActive && "bg-primary/10 text-primary dark:bg-primary dark:text-primary-foreground"
      )}
      onClick={() => handleMenuClick(item.key, item.path)}
      asChild
    >
      <Link to={item.path} title={item.title}>
        {React.cloneElement(item.icon, { className: cn("h-5 w-5", isSidebarOpen && "mr-3") })}
        {isSidebarOpen && <span>{item.title}</span>}
      </Link>
    </Button>
  );
};

const SidebarCollapsibleLink = ({ item, activeMenu, openDropdown, toggleDropdown, handleMenuClick, isSidebarOpen, userRole }) => {
  const isParentActive = item.subItems?.some(sub => activeMenu === sub.key) || activeMenu === item.key;
  const filteredSubItems = item.subItems.filter(subItem => !subItem.roles || subItem.roles.includes(userRole));

  if (filteredSubItems.length === 0) return null;

  return (
    <Collapsible open={openDropdown === item.key} onOpenChange={() => toggleDropdown(item.key)}>
      <CollapsibleTrigger asChild>
        <Button
          variant={isParentActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-sm h-10 mb-1",
            !isSidebarOpen && "justify-center",
            isParentActive && "bg-primary/10 text-primary dark:bg-primary dark:text-primary-foreground"
          )}
          title={item.title}
        >
          {React.cloneElement(item.icon, { className: cn("h-5 w-5", isSidebarOpen && "mr-3") })}
          {isSidebarOpen && <span className="flex-1 text-left">{item.title}</span>}
          {isSidebarOpen && <ChevronDown className={cn("h-4 w-4 transition-transform", openDropdown === item.key && "rotate-180")} />}
        </Button>
      </CollapsibleTrigger>
      {isSidebarOpen && (
        <CollapsibleContent className="pl-5 space-y-1 py-1">
          {filteredSubItems.map((subItem) => (
            <SidebarLink
              key={subItem.key}
              item={subItem}
              activeMenu={activeMenu}
              handleMenuClick={handleMenuClick}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

const SidebarContent = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const userData = isAuth();
  const userRole = userData?.role || localStorage.getItem("role")?.split(',')[0]; // Take first role if multiple
  const fullname = userData?.fullname || localStorage.getItem("fullname") || "User";

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.flatMap(item => item.subItems ? [item, ...item.subItems] : [item])
                             .find(item => item.path === currentPath);
    if (activeItem) {
      setActiveMenu(activeItem.key);
      const parent = menuItems.find(p => p.subItems?.some(s => s.key === activeItem.key));
      if (parent) setOpenDropdown(parent.key);
    } else {
      setActiveMenu("");
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  const handleMenuClick = (key, path) => {
    setActiveMenu(key);
    if (path && location.pathname !== path) {
      navigate(path);
    }
    if (window.innerWidth < 768 && setIsSidebarOpen) { // Close mobile sheet on nav
      setIsSidebarOpen(false);
    }
  };

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const onLogout = () => {
    Swal.fire({
      title: "Logout Confirmation", text: "Are you sure you want to logout?", icon: "warning",
      showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33", confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({ title: "Logging out...", showConfirmButton: false, didOpen: () => Swal.showLoading() });
        setTimeout(() => { clearAuth(); Swal.close(); navigate("/"); }, 1000);
      }
    });
  };

  const filteredMenuItems = menuItems.filter(item => !item.roles || item.roles.includes(userRole));

  return (
    <div className={cn("flex flex-col h-full bg-card border-r", isSidebarOpen ? "w-64" : "w-16", "transition-all duration-300 ease-in-out")}>
      {/* Logo and Desktop Toggle */}
      <div className={cn("flex items-center border-b h-[70px] px-3 shrink-0", !isSidebarOpen && "justify-center")}>
        {isSidebarOpen && (
          <Link to="/dashboard" className="flex items-center gap-2">
            {/* <img src={logo} alt="Logo" className="h-8 object-contain" /> */}
            <span className="font-semibold text-lg">Monitoring</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" className="ml-auto hidden md:flex" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </Button>
      </div>

      {/* User Profile */}
      <div className={cn("p-3 mt-4 border-b pb-4", !isSidebarOpen && "px-1")}>
        <Link to="/profile" className="flex flex-col items-center text-center group"> {/* Assuming a /profile route */}
          <Avatar className={cn("h-16 w-16 mb-2", !isSidebarOpen && "h-10 w-10")}>
            {/* <AvatarImage src={userPlaceholder} alt={fullname} /> */}
            <AvatarFallback>{fullname.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {isSidebarOpen && (
            <>
              <p className="font-semibold text-sm group-hover:text-primary">{fullname}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-3 py-4 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) =>
          item.subItems ? (
            <SidebarCollapsibleLink
              key={item.key}
              item={item}
              activeMenu={activeMenu}
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              handleMenuClick={handleMenuClick}
              isSidebarOpen={isSidebarOpen}
              userRole={userRole}
            />
          ) : (
            <SidebarLink
              key={item.key}
              item={item}
              activeMenu={activeMenu}
              handleMenuClick={handleMenuClick}
              isSidebarOpen={isSidebarOpen}
            />
          )
        )}
      </nav>

      {/* Logout Button */}
      <div className="p-3 mt-auto border-t">
        <Button variant="destructive" className="w-full" onClick={onLogout} title="Logout">
          <LogOut className={cn("h-5 w-5", isSidebarOpen && "mr-3")} />
          {isSidebarOpen && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

// Main Sidebar component handling desktop and mobile
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isMobileSidebarOpen, setIsMobileSidebarOpen }) => {
  if (window.innerWidth < 768) { // Mobile view
    return (
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent isSidebarOpen={true} setIsSidebarOpen={setIsMobileSidebarOpen} />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop view
  return <SidebarContent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />;
};

export default Sidebar;