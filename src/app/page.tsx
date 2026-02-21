"use client";

import { 
  Building2, 
  Car, 
  Users, 
  ArrowUpRight,
  TrendingUp,
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
  { title: "إجمالي العقارات", value: 24, icon: Building2, trend: "+٢", color: "text-blue-600" },
  { title: "حجم الأسطول", value: 58, icon: Car, trend: "+٥", color: "text-indigo-600" },
  { title: "إجمالي الموظفين", value: 142, icon: Users, trend: "+١٢", color: "text-emerald-600" },
  { title: "الإيرادات الشهرية", value: 1200000, isCurrency: true, icon: SaudiRiyalIcon, trend: "+١٢.٥٪", color: "text-primary" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-col text-right">
              <h1 className="text-sm font-semibold">لوحة التحكم</h1>
              <p className="text-[10px] text-muted-foreground">{toHijriDate()}</p>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-medium text-right w-full">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 justify-end">
                    <div className="text-xl font-bold">
                      {stat.isCurrency ? formatCurrencyValue(stat.value as number) : toArabicDigits(stat.value)}
                    </div>
                    {stat.isCurrency && <stat.icon className="h-4 w-4 opacity-70" />}
                  </div>
                  <p className="text-[10px] text-emerald-600 flex items-center justify-end gap-1 font-medium mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    {toArabicDigits(stat.trend)} منذ الشهر الماضي
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle className="text-right">الأداء المالي</CardTitle>
                <CardDescription className="text-right">مقارنة الإيرادات والمصروفات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#888888" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        stroke="#888888" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => toArabicDigits(`${value/1000}ألف`)}
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm text-right">
                                <p className="text-[10px] font-bold mb-1">{payload[0].payload.month}</p>
                                <div className="space-y-1">
                                  <p className="text-[10px] text-primary">الإيرادات: {formatCurrencyValue(payload[0].value as number)}</p>
                                  <p className="text-[10px] text-rose-500">المصروفات: {formatCurrencyValue(payload[1].value as number)}</p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="revenue" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                      <Bar dataKey="expense" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-muted" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-right">آخر العمليات</CardTitle>
                <CardDescription className="text-right">تحديثات الأنشطة الميدانية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "تجديد عقد إيجار", sub: "مبنى الجوهرة - وحدة ٠٤", time: "قبل ساعتين" },
                    { title: "صيانة أسطول", sub: "شاحنة نقل رقم ٤٥٢", time: "قبل ٥ ساعات" },
                    { title: "تعيين موظف", sub: "سارة محمد - محاسبة", time: "أمس" },
                    { title: "سداد زكاة", sub: "دفعة الربع الأول ١٤٤٥", time: "منذ يومين" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-right">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono">{toArabicDigits(item.time)}</div>
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