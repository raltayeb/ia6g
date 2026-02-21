"use client";

import { 
  Building2, 
  Car, 
  Users, 
  ArrowUpRight,
  Wallet,
  TrendingUp,
  Activity
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

const financialData = [
  { month: "محرم", revenue: 45000, expense: 32000 },
  { month: "صفر", revenue: 52000, expense: 31000 },
  { month: "ربيع ١", revenue: 48000, expense: 35000 },
  { month: "ربيع ٢", revenue: 61000, expense: 38000 },
  { month: "جمادى ١", revenue: 55000, expense: 42000 },
  { month: "جمادى ٢", revenue: 67000, expense: 40000 },
];

const stats = [
  { title: "إجمالي العقارات", value: 24, icon: Building2, trend: "+٢", color: "text-blue-600", bg: "bg-blue-50" },
  { title: "حجم الأسطول", value: 58, icon: Car, trend: "+٥", color: "text-indigo-600", bg: "bg-indigo-50" },
  { title: "إجمالي الموظفين", value: 142, icon: Users, trend: "+١٢", color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "الإيرادات الشهرية", value: 1200000, isCurrency: true, icon: Wallet, trend: "+١٢.٥٪", color: "text-primary", bg: "bg-primary/5" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b sticky top-0 bg-background/95 backdrop-blur z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-col text-right">
              <h1 className="text-sm font-bold tracking-tight">لوحة التحكم</h1>
              <p className="text-[10px] text-muted-foreground">{toHijriDate()}</p>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="rounded-xl border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1">
                    <div className="text-xl font-black">
                      {stat.isCurrency ? formatCurrencyValue(stat.value as number) : toArabicDigits(stat.value)}
                    </div>
                    {stat.isCurrency && <SaudiRiyalIcon className="h-4 w-4 opacity-70" />}
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <ArrowUpRight className="h-3 w-3" />
                      {toArabicDigits(stat.trend)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">منذ الشهر الماضي</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-8 rounded-xl border shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-muted/30 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold">الأداء المالي</CardTitle>
                    <CardDescription className="text-[10px]">مقارنة الإيرادات والمصروفات خلال النصف الأول</CardDescription>
                  </div>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#a0a0a0" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        tick={{dy: 10}}
                      />
                      <YAxis 
                        stroke="#a0a0a0" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => toArabicDigits(`${value/1000}ألف`)}
                      />
                      <Tooltip 
                        cursor={{fill: '#f9fafb'}}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-3 shadow-md text-right min-w-[120px]">
                                <p className="text-xs font-bold mb-2 border-b pb-1">{payload[0].payload.month}</p>
                                <div className="space-y-1.5">
                                  <div className="flex justify-between items-center gap-4">
                                    <span className="text-[10px] text-muted-foreground">الإيرادات:</span>
                                    <span className="text-[10px] font-bold text-primary">{formatCurrencyValue(payload[0].value as number)}</span>
                                  </div>
                                  <div className="flex justify-between items-center gap-4">
                                    <span className="text-[10px] text-muted-foreground">المصروفات:</span>
                                    <span className="text-[10px] font-bold text-rose-500">{formatCurrencyValue(payload[1].value as number)}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} />
                      <Bar dataKey="expense" fill="hsl(var(--muted-foreground)/0.2)" radius={[4, 4, 0, 0]} barSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 rounded-xl border shadow-sm">
              <CardHeader className="border-b bg-muted/30 px-6 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold">آخر العمليات</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { title: "تجديد عقد إيجار", sub: "مبنى الجوهرة - وحدة ٠٤", time: "قبل ساعتين", type: "property" },
                    { title: "صيانة أسطول", sub: "شاحنة نقل رقم ٤٥٢", time: "قبل ٥ ساعات", type: "fleet" },
                    { title: "تعيين موظف", sub: "سارة محمد - محاسبة", time: "أمس", type: "hr" },
                    { title: "سداد زكاة", sub: "دفعة الربع الأول ١٤٤٥", time: "منذ يومين", type: "finance" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors">
                      <div className="flex-1 space-y-1">
                        <p className="text-xs font-bold leading-none">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                      </div>
                      <div className="text-[9px] font-bold text-muted-foreground bg-muted px-2 py-1 rounded">{toArabicDigits(item.time)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
