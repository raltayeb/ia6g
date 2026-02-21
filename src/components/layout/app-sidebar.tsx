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
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
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
    <Sidebar variant="sidebar" side="right" collapsible="icon" className="border-l">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shrink-0">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden text-right">
            <span className="font-headline text-base font-bold leading-none">نظام السلام</span>
            <span className="text-[10px] text-muted-foreground mt-1">إدارة الموارد ERP</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold text-muted-foreground uppercase px-2 mb-2">العمليات التشغيلية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold text-muted-foreground uppercase px-2 mb-2">القسم المالي</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financialNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold text-muted-foreground uppercase px-2 mb-2">الإدارة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t bg-muted/20">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden text-right">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">أ</div>
          <div className="flex flex-col truncate">
            <span className="text-sm font-bold leading-none">أحمد العبدالله</span>
            <span className="text-[10px] text-muted-foreground mt-1">المدير التنفيذي</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}