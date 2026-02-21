
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
    <Sidebar variant="sidebar" side="right" collapsible="icon" className="border-l bg-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 shrink-0">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
            <span className="font-headline text-lg font-black tracking-tight leading-none">نظام السلام</span>
            <span className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">إدارة الموارد ERP</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4 gap-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 mb-2 font-black text-[10px] tracking-widest text-slate-400">العمليات التشغيلية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="rounded-xl h-10 px-4 transition-all duration-200">
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${pathname === item.url ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="font-bold text-[13px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 mb-2 font-black text-[10px] tracking-widest text-slate-400">القسم المالي</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {financialNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="rounded-xl h-10 px-4 transition-all duration-200">
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${pathname === item.url ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="font-bold text-[13px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 mb-2 font-black text-[10px] tracking-widest text-slate-400">الإدارة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {adminNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title} className="rounded-xl h-10 px-4 transition-all duration-200">
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${pathname === item.url ? 'text-primary' : 'text-slate-400'}`} />
                      <span className="font-bold text-[13px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t mt-auto bg-slate-50/50">
        <div className="flex items-center gap-4 group-data-[collapsible=icon]:hidden">
          <div className="h-10 w-10 rounded-2xl bg-white flex items-center justify-center text-slate-600 font-black shrink-0 shadow-sm border border-slate-200/50">أ</div>
          <div className="flex flex-col truncate">
            <span className="text-[13px] font-black leading-none">أحمد العبدالله</span>
            <span className="text-[10px] text-muted-foreground font-bold mt-1">المدير التنفيذي</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
