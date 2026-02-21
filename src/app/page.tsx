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
import { toArabicDigits, formatCurrency, toHijriDate } from "@/lib/utils";

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
  { title: "الإيرادات الشهرية", value: 1200000, isCurrency: true, icon: SaudiRiyalIcon, trend: "+١٢.٥٪", color: "text-blue-600" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 text-slate-500" />
            <div>
              <h1 className="font-headline text-lg font-bold tracking-tight">نظرة عامة</h1>
              <p className="text-[10px] text-muted-foreground font-medium">{toHijriDate()}</p>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="border-none shadow-hig hover:shadow-hig-large transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xs font-bold text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-xl bg-slate-50 ${stat.color}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black">
                    {stat.isCurrency ? formatCurrency(stat.value as number) : toArabicDigits(stat.value)}
                  </div>
                  <p className="text-[11px] mt-1 font-bold">
                    <span className="text-emerald-500 inline-flex items-center">
                      <ArrowUpRight className="h-3 w-3 ml-0.5" />
                      {stat.trend}
                    </span>{" "}
                    <span className="text-slate-400">عن الشهر السابق</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 border-none shadow-hig">
              <CardHeader>
                <CardTitle className="text-base font-bold">نمو الإيرادات</CardTitle>
                <CardDescription className="text-xs font-medium italic text-slate-400">تحليل الأداء المالي الربعي (ر.س)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[320px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#94a3b8" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        fontFamily="Cairo"
                        fontWeight={600}
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => toArabicDigits(`${value/1000}ألف`)}
                        fontFamily="Cairo"
                        fontWeight={600}
                      />
                      <Tooltip 
                        cursor={{fill: '#f8fafc', radius: 8}}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-2xl border-none bg-white p-3 shadow-hig-large text-right min-w-[120px]">
                                <p className="text-[10px] font-black mb-2 text-slate-800">{payload[0].payload.month}</p>
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-[10px] font-bold text-slate-500">الإيرادات:</span>
                                    <span className="text-[11px] font-black text-blue-600">{formatCurrency(payload[0].value as number)}</span>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-[10px] font-bold text-slate-500">المصروفات:</span>
                                    <span className="text-[11px] font-black text-rose-500">{formatCurrency(payload[1].value as number)}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={24} />
                      <Bar dataKey="expense" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 border-none shadow-hig">
              <CardHeader>
                <CardTitle className="text-base font-bold">النشاط الأخير</CardTitle>
                <CardDescription className="text-xs font-medium text-slate-400">آخر التحديثات عبر جميع الأقسام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { title: "تجديد عقد إيجار", sub: "مبنى الجوهرة - وحدة ٠٤", time: "قبل ساعتين", dot: "bg-blue-500" },
                    { title: "صيانة أسطول", sub: "شاحنة نقل رقم ٤٥٢", time: "قبل ٥ ساعات", dot: "bg-emerald-500" },
                    { title: "تعيين موظف", sub: "سارة محمد - محاسبة", time: "أمس", dot: "bg-indigo-500" },
                    { title: "سداد زكاة", sub: "دفعة الربع الأول ١٤٤٥", time: "منذ يومين", dot: "bg-blue-600" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group cursor-default">
                      <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${item.dot} ring-4 ring-slate-50`} />
                      <div className="flex-1 space-y-0.5">
                        <p className="text-xs font-bold group-hover:text-primary transition-colors">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">{item.sub}</p>
                      </div>
                      <div className="text-[9px] font-bold text-slate-400 shrink-0">{item.time}</div>
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