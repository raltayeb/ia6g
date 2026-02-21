"use client";

import { 
  Building2, 
  Car, 
  Users, 
  ArrowUpRight,
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
  Tooltip
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
  { title: "إجمالي العقارات", value: 24, icon: Building2, trend: "+٢", color: "text-blue-500" },
  { title: "حجم الأسطول", value: 58, icon: Car, trend: "+٥", color: "text-indigo-500" },
  { title: "إجمالي الموظفين", value: 142, icon: Users, trend: "+١٢", color: "text-sky-500" },
  { title: "الإيرادات الشهرية", value: 1200000, isCurrency: true, icon: SaudiRiyalIcon, trend: "+١٢.٥٪", color: "text-primary" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8F9FB]">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 bg-white/60 backdrop-blur-xl sticky top-0 z-30 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground" />
            <div className="text-right">
              <h1 className="font-headline text-lg font-bold tracking-tight">نظرة عامة</h1>
              <p className="text-xs text-muted-foreground">{toHijriDate()}</p>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-8 p-6 max-w-7xl mx-auto w-full">
          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="bg-white border-0 ring-1 ring-foreground/5 shadow-none">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xs font-medium text-muted-foreground uppercase">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold">
                      {stat.isCurrency ? formatCurrencyValue(stat.value as number) : toArabicDigits(stat.value)}
                    </span>
                    {stat.isCurrency && <stat.icon className="h-5 w-5 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-primary font-medium inline-flex items-center">
                      <ArrowUpRight className="h-3 w-3 ml-0.5" />
                      {toArabicDigits(stat.trend)}
                    </span>{" "}
                    عن الشهر السابق
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 bg-white border-0 ring-1 ring-foreground/5">
              <CardHeader>
                <CardTitle className="text-sm font-bold">نمو الإيرادات</CardTitle>
                <CardDescription>تحليل الأداء المالي الربعي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#94A3B8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        fontFamily="Cairo"
                      />
                      <YAxis 
                        stroke="#94A3B8" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => toArabicDigits(`${value/1000}ألف`)}
                        fontFamily="Cairo"
                      />
                      <Tooltip 
                        cursor={{fill: '#F1F5F9'}}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-white p-3 shadow-lg text-right ring-1 ring-black/5">
                                <p className="text-xs font-bold mb-2">{payload[0].payload.month}</p>
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-xs text-muted-foreground">الإيرادات:</span>
                                    <div className="flex items-center gap-0.5">
                                      <span className="text-xs font-bold text-primary">{formatCurrencyValue(payload[0].value as number)}</span>
                                      <SaudiRiyalIcon className="size-3 text-primary" />
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-xs text-muted-foreground">المصروفات:</span>
                                    <div className="flex items-center gap-0.5">
                                      <span className="text-xs font-bold text-destructive">{formatCurrencyValue(payload[1].value as number)}</span>
                                      <SaudiRiyalIcon className="size-3 text-destructive" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 bg-white border-0 ring-1 ring-foreground/5">
              <CardHeader>
                <CardTitle className="text-sm font-bold">النشاط الأخير</CardTitle>
                <CardDescription>آخر التحديثات عبر جميع الأقسام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { title: "تجديد عقد إيجار", sub: "مبنى الجوهرة - وحدة ٠٤", time: "قبل ساعتين", color: "bg-blue-500" },
                    { title: "صيانة أسطول", sub: "شاحنة نقل رقم ٤٥٢", time: "قبل ٥ ساعات", color: "bg-emerald-500" },
                    { title: "تعيين موظف", sub: "سارة محمد - محاسبة", time: "أمس", color: "bg-indigo-500" },
                    { title: "سداد زكاة", sub: "دفعة الربع الأول ١٤٤٥", time: "منذ يومين", color: "bg-primary" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-1.5 size-2 rounded-full ${item.color} ring-2 ring-white`} />
                      <div className="flex-1 space-y-1 text-right">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{item.sub}</p>
                      </div>
                      <div className="text-[10px] text-muted-foreground whitespace-nowrap">{toArabicDigits(item.time)}</div>
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
