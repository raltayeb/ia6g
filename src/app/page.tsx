"use client";

import { 
  Building2, 
  Car, 
  Users, 
  ArrowUpRight,
  Wallet,
  Activity,
  Bell,
  Search,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { toArabicDigits, formatCurrencyValue, toHijriDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const financialData = [
  { month: "محرم", revenue: 45000, expense: 32000 },
  { month: "صفر", revenue: 52000, expense: 31000 },
  { month: "ربيع ١", revenue: 48000, expense: 35000 },
  { month: "ربيع ٢", revenue: 61000, expense: 38000 },
  { month: "جمادى ١", revenue: 55000, expense: 42000 },
  { month: "جمادى ٢", revenue: 67000, expense: 40000 },
];

const stats = [
  { title: "العقارات", value: 24, icon: Building2, trend: "+٢", color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "الأسطول", value: 58, icon: Car, trend: "+٥", color: "text-blue-600", bg: "bg-blue-50" },
  { title: "الموظفين", value: 142, icon: Users, trend: "+١٢", color: "text-amber-600", bg: "bg-amber-50" },
  { title: "الإيرادات", value: 1200000, isCurrency: true, icon: Wallet, trend: "+١٢.٥٪", color: "text-emerald-700", bg: "bg-emerald-100" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 text-primary" />
            <div className="flex flex-col items-start">
              <h1 className="text-sm font-black text-primary">لوحة التحكم</h1>
              <span className="text-[10px] font-bold text-muted-foreground">{toHijriDate()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="بحث سريع..." className="h-8 w-64 pr-8 rounded-xl bg-white/50 border-none text-xs" dir="rtl" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 left-2 h-1.5 w-1.5 bg-destructive rounded-full" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="border-none shadow-sm rounded-3xl bg-white/80 group hover:bg-white transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <div className={`p-2.5 rounded-2xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge variant="secondary" className="rounded-lg text-[9px] font-bold bg-emerald-50 text-emerald-700 border-none">
                    {toArabicDigits(stat.trend)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xl font-black">
                      {stat.isCurrency ? formatCurrencyValue(stat.value as number) : toArabicDigits(stat.value)}
                    </span>
                    {stat.isCurrency && <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-60" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-8 border-none shadow-sm rounded-3xl bg-white/80 overflow-hidden">
              <CardHeader className="px-6 py-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold">الأداء المالي</CardTitle>
                  <CardDescription className="text-[10px]">مقارنة الإيرادات بالمصروفات التشغيلية</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] font-bold gap-1 rounded-xl">
                  تصدير التقرير
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-2">
                <div className="h-[280px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#94A3B8" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        stroke="#94A3B8" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => toArabicDigits(`${value/1000}ك`)}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="revenue" fill="oklch(var(--primary))" radius={[6, 6, 0, 0]} barSize={30} />
                      <Bar dataKey="expense" fill="oklch(var(--muted-foreground))" radius={[6, 6, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <Card className="border-none shadow-sm rounded-3xl bg-primary text-primary-foreground overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold">النشاط الأخير</CardTitle>
                    <Activity className="h-4 w-4 opacity-60" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {[
                    { title: "تجديد عقد", sub: "مجمع السلام - و ٤", time: "٢س" },
                    { title: "صيانة مركبة", sub: "تويوتا - أ ب ج", time: "٥س" },
                    { title: "تعيين جديد", sub: "سارة م. - محاسبة", time: "١٠س" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <p className="text-xs font-bold">{item.title}</p>
                        <p className="text-[9px] opacity-70">{item.sub}</p>
                      </div>
                      <span className="text-[9px] font-black bg-white/20 px-2 py-0.5 rounded-full">{toArabicDigits(item.time)}</span>
                    </div>
                  ))}
                  <Button variant="secondary" className="w-full mt-2 rounded-xl h-9 bg-white text-primary hover:bg-white/90 font-bold text-[10px] gap-1">
                    مشاهدة الكل
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-3xl bg-white/80 p-6 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest">حالة النظام</span>
                  <span className="text-xs font-bold text-foreground">جميع الخدمات تعمل بكفاءة</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/10" />
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
