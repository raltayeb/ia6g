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
  Plus,
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainNav = [
  { title: "لوحة التحكم", icon: LayoutDashboard, url: "/" },
  { title: "العقارات", icon: Building2, url: "/properties" },
  { title: "الأسطول", icon: Car, url: "/vehicles" },
  { title: "الموارد البشرية", icon: Users, url: "/employees" },
  { title: "السكن", icon: Home, url: "/accommodations" },
];

const financeNav = [
  { title: "المالية", icon: Wallet, url: "/finance" },
  { title: "الزكاة والضريبة", icon: ShieldCheck, url: "/zakat" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="right" collapsible="icon" className="border-l-0 bg-background">
      <SidebarHeader className="h-20 flex items-center justify-center px-6">
        <div className="flex items-center gap-3 w-full">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-base font-bold tracking-tight text-foreground">نظام السلام</span>
            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-70">ERP v3.0</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <div className="mb-6 px-3 group-data-[collapsible=icon]:hidden">
          <Button className="w-full justify-start gap-3 rounded-2xl h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
            <Plus className="h-5 w-5" />
            <span className="font-bold">إضافة سريعة</span>
          </Button>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">الرئيسية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.url} className="mb-1">
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="h-12 rounded-full px-4 transition-all hover:bg-secondary/50 data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground">
                    <Link href={item.url} className="flex items-center gap-4">
                      <item.icon className={`h-5 w-5 shrink-0 ${pathname === item.url ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">المالية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financeNav.map((item) => (
                <SidebarMenuItem key={item.url} className="mb-1">
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="h-12 rounded-full px-4 transition-all hover:bg-secondary/50 data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground">
                    <Link href={item.url} className="flex items-center gap-4">
                      <item.icon className={`h-5 w-5 shrink-0 ${pathname === item.url ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"} className="h-12 rounded-full px-4 transition-all hover:bg-secondary/50">
              <Link href="/settings" className="flex items-center gap-4">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">الإعدادات</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}