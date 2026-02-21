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
  Briefcase,
  CheckSquare,
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

const mainNav = [
  { title: "لوحة التحكم", icon: LayoutDashboard, url: "/overview" },
  { title: "إدارة المهام", icon: CheckSquare, url: "/tasks" },
  { title: "علاقات العملاء", icon: Briefcase, url: "/crm" },
];

const operationsNav = [
  { title: "إدارة العقارات", icon: Building2, url: "/properties" },
  { title: "إدارة المركبات", icon: Car, url: "/vehicles" },
  { title: "الموارد البشرية", icon: Users, url: "/employees" },
  { title: "إدارة السكن", icon: Home, url: "/accommodations" },
];

const financeNav = [
  { title: "المالية", icon: Wallet, url: "/finance" },
  { title: "الزكاة والضريبة", icon: ShieldCheck, url: "/zakat" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="right" collapsible="icon" className="border-l border-slate-100 bg-white">
      <SidebarHeader className="h-20 flex items-center justify-center px-6">
        <div className="flex items-center gap-3 w-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-primary shrink-0">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden text-right">
            <span className="text-sm font-medium tracking-tight text-foreground">شركة طارق الجعفرى</span>
            <span className="text-[9px] text-muted-foreground uppercase font-medium tracking-widest opacity-70">ERP v3.0</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-2 text-right w-full">العامة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.url} className="mb-1">
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="h-11 rounded-full px-4 transition-all hover:bg-emerald-50/50 data-[active=true]:bg-emerald-50 data-[active=true]:text-primary border-none">
                    <Link href={item.url} className="flex items-center gap-4 flex-row-reverse w-full justify-end">
                      <span className="text-[13px] font-medium">{item.title}</span>
                      <item.icon className={`h-5 w-5 shrink-0 ${pathname === item.url ? "text-primary" : "text-slate-400"}`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-2 text-right w-full">الإدارة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operationsNav.map((item) => (
                <SidebarMenuItem key={item.url} className="mb-1">
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="h-11 rounded-full px-4 transition-all hover:bg-emerald-50/50 data-[active=true]:bg-emerald-50 data-[active=true]:text-primary border-none">
                    <Link href={item.url} className="flex items-center gap-4 flex-row-reverse w-full justify-end">
                      <span className="text-[13px] font-medium">{item.title}</span>
                      <item.icon className={`h-5 w-5 shrink-0 ${pathname === item.url ? "text-primary" : "text-slate-400"}`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-2 text-right w-full">المالية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financeNav.map((item) => (
                <SidebarMenuItem key={item.url} className="mb-1">
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="h-11 rounded-full px-4 transition-all hover:bg-emerald-50/50 data-[active=true]:bg-emerald-50 data-[active=true]:text-primary border-none">
                    <Link href={item.url} className="flex items-center gap-4 flex-row-reverse w-full justify-end">
                      <span className="text-[13px] font-medium">{item.title}</span>
                      <item.icon className={`h-5 w-5 shrink-0 ${pathname === item.url ? "text-primary" : "text-slate-400"}`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"} className="h-11 rounded-full px-4 transition-all hover:bg-slate-50 border-none">
              <Link href="/settings" className="flex items-center gap-4 flex-row-reverse w-full justify-end">
                <span className="text-[13px] font-medium">الإعدادات</span>
                <Settings className="h-5 w-5 text-slate-400" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
