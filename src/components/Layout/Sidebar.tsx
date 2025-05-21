
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Wallet, Plus, BarChart, ExternalLink, Settings, LayoutDashboard } from 'lucide-react';

const AppSidebar = () => {
  const sidebar = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { title: 'Generate', icon: Plus, path: '/generate' },
    { title: 'Wallets', icon: Wallet, path: '/wallets' },
    { title: 'Transactions', icon: ExternalLink, path: '/transactions' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return isActive 
      ? "bg-primary/10 text-primary font-medium border-l-4 border-primary flex items-center p-2 my-1 transition-colors duration-200" 
      : "hover:bg-muted flex items-center p-2 my-1 transition-colors duration-200";
  };

  return (
    <Sidebar
      className={`h-screen ${sidebar.state === 'collapsed' ? 'w-16' : 'w-64'} border-r border-border bg-background`}
      collapsible="icon"
    >
      <SidebarContent className="pt-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink to={item.path} end className={getNavClass}>
                  <item.icon className={`h-5 w-5 ${sidebar.state !== 'collapsed' && "mr-2"}`} />
                  {sidebar.state !== 'collapsed' && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
