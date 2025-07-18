import { Bell, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Properties", href: "/dashboard/properties" },
  { name: "Leases", href: "/dashboard/leases" },
  { name: "Payments", href: "/dashboard/payments" },
  { name: "Maintenance", href: "/dashboard/maintenance" },
];

export function Header() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-lg">PropertyPro</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 ml-8">
          {navigation.map((item) => {
            const isActive =
              location.pathname == item.href ||
              (location.pathname.startsWith(item.href) &&
                item.href !== "/dashboard");
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-200 cursor-pointer px-2 py-1 rounded-full",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-primary",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Removed search bar for premium look */}

        {/* Right side */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* User Avatar Dropdown with notification badge */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative p-0">
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center z-10">
                  2
                </span>
                <Avatar>
                  <AvatarImage src="/placeholder3.svg" />
                  <AvatarFallback>
                    {user ? user.initials : 'AN'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Notifications</span>
                <span className="ml-auto bg-destructive text-destructive-foreground rounded-full px-2 text-xs font-semibold">
                  2
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  to="/dashboard/profile"
                  className="flex items-center w-full"
                >
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center w-full"
                >
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="text-destructive flex items-center cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
