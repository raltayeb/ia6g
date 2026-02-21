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
    <Sidebar variant="sidebar" side="right" collapsible="icon" className="border-none bg-sidebar p-2">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden text-right">
            <span className="font-headline text-lg font-black leading-none text-primary">نظام السلام</span>
            <span className="text-[10px] font-bold text-muted-foreground mt-1.5 uppercase tracking-widest">إدارة الموارد ERP</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black text-slate-400 uppercase px-4 mb-4 tracking-tighter">العمليات التشغيلية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url} 
                    tooltip={item.title}
                    className={`h-12 rounded-2xl px-4 transition-all duration-300 ${pathname === item.url ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'hover:bg-slate-100'}`}
                  >
                    <Link href={item.url} className="flex items-center gap-4">
                      <item.icon className={`h-5 w-5 ${pathname === item.url ? 'text-primary' : 'text-slate-500'}`} />
                      <span className={`text-sm font-bold ${pathname === item.url ? 'text-primary' : 'text-slate-600'}`}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-[10px] font-black text-slate-400 uppercase px-4 mb-4 tracking-tighter">القسم المالي</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {financialNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url} 
                    tooltip={item.title}
                    className={`h-12 rounded-2xl px-4 transition-all duration-300 ${pathname === item.url ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'hover:bg-slate-100'}`}
                  >
                    <Link href={item.url} className="flex items-center gap-4">
                      <item.icon className={`h-5 w-5 ${pathname === item.url ? 'text-primary' : 'text-slate-500'}`} />
                      <span className={`text-sm font-bold ${pathname === item.url ? 'text-primary' : 'text-slate-600'}`}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-[10px] font-black text-slate-400 uppercase px-4 mb-4 tracking-tighter">الإدارة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {adminNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url} 
                    tooltip={item.title}
                    className={`h-12 rounded-2xl px-4 transition-all duration-300 ${pathname === item.url ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'hover:bg-slate-100'}`}
                  >
                    <Link href={item.url} className="flex items-center gap-4">
                      <item.icon className={`h-5 w-5 ${pathname === item.url ? 'text-primary' : 'text-slate-500'}`} />
                      <span className={`text-sm font-bold ${pathname === item.url ? 'text-primary' : 'text-slate-600'}`}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 mt-auto">
        <div className="flex items-center gap-4 group-data-[collapsible=icon]:hidden text-right bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-sm font-black shrink-0">أ</div>
          <div className="flex flex-col truncate">
            <span className="text-sm font-black leading-none text-slate-800">أحمد العبدالله</span>
            <span className="text-[10px] font-bold text-muted-foreground mt-1.5 uppercase">المدير التنفيذي</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
