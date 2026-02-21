"use client";

import {
  LayoutDashboard,
  Building2,
  Car,
  Users,
  Home,
  Wallet,
  Settings,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "لوحة التحكم", icon: LayoutDashboard, url: "/" },
  { title: "إدارة العقارات", icon: Building2, url: "/properties" },
  { title: "إدارة الأسطول", icon: Car, url: "/vehicles" },
  { title: "الموارد البشرية", icon: Users, url: "/employees" },
  { title: "إدارة السكن", icon: Home, url: "/accommodations" },
];

const financialNav = [
  { title: "الحسابات والمالية", icon: Wallet, url: "/finance" },
  { title: "الزكاة والضريبة", icon: ShieldCheck, url: "/zakat" },
];

const adminNav = [
  { title: "إعدادات النظام", icon: Settings, url: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="right">
      <SidebarHeader className="h-16 flex items-center px-6 border-b">
        <div className="flex items-center gap-3 w-full">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-primary truncate leading-none">نظام السلام</span>
            <span className="text-[10px] text-muted-foreground truncate mt-1">إدارة موارد المؤسسات</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">العمليات</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url} className="flex items-center gap-3 px-4">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">المالية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financialNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url} className="flex items-center gap-3 px-4">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          {adminNav.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                <Link href={item.url} className="flex items-center gap-3 px-4">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
