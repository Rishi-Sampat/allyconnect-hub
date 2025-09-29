import { useState } from "react";
import { Search, Menu, X, User, Bell, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isAuthenticated?: boolean;
  userRole?: 'alumni' | 'student' | 'admin';
  userName?: string;
  userAvatar?: string;
}

const Header = ({ isAuthenticated = false, userRole, userName, userAvatar }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Events", href: "/events" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Alumni", href: "/alumni" },
    { label: "Leaderboard", href: "/leaderboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/95 border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AllyConnect
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search alumni, events, opportunities..."
                className="pl-10 bg-muted/50 border-border/50 focus:bg-background transition-colors"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Quick Actions */}
                <div className="hidden lg:flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="bg-secondary/10 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                    Post Doubt
                  </Button>
                  {(userRole === 'alumni' || userRole === 'admin') && (
                    <Button variant="outline" size="sm" className="bg-primary/10 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Create Opportunity
                    </Button>
                  )}
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* Messages */}
                <Button variant="ghost" size="sm" className="relative">
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {userName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" className="hidden sm:inline-flex">
                  Sign In
                </Button>
                <Button className="bg-gradient-primary hover:shadow-primary">
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 bg-muted/50 border-border/50"
                  />
                </div>
              </div>

              {/* Mobile navigation */}
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile actions */}
              {isAuthenticated && (
                <div className="px-3 pt-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full bg-secondary/10 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                    Post Doubt
                  </Button>
                  {(userRole === 'alumni' || userRole === 'admin') && (
                    <Button variant="outline" size="sm" className="w-full bg-primary/10 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Create Opportunity
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;