
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 bg-background/95 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        <h1 className="text-xl font-bold text-primary">CryptoDummy</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        {!isMobile && (
          <>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </>
        )}
        <Button variant="outline" size={isMobile ? "icon" : "default"} className="ml-2">
          {isMobile ? (
            <User className="h-5 w-5" />
          ) : (
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>Admin</span>
            </div>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
