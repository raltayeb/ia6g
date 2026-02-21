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
  { title: "إجمالي العقارات", value: 24, icon: Building2, trend: "+٢", color: "bg-blue-100 text-blue-700" },
  { title: "حجم الأسطول", value: 58, icon: Car, trend: "+٥", color: "bg-indigo-100 text-indigo-700" },
  { title: "إجمالي الموظفين", value: 142, icon: Users, trend: "+١٢", color: "bg-emerald-100 text-emerald-700" },
  { title: "الإيرادات الشهرية", value: 1200000, isCurrency: true, icon: SaudiRiyalIcon, trend: "+١٢.٥٪", color: "bg-primary/10 text-primary" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 bg-white/60 backdrop-blur-xl border-b sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1 text-primary" />
            <div className="text-right">
              <h1 className="font-headline text-lg font-bold text-primary">لوحة التحكم</h1>
              <p className="text-[10px] text-muted-foreground font-medium">{toHijriDate()}</p>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
          {/* Stats Grid - MD3 Style */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="bg-white/80 border-none shadow-sm rounded-3xl overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex flex-row-reverse items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div className="bg-slate-50 px-2 py-1 rounded-full flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-600">{toArabicDigits(stat.trend)}</span>
                    </div>
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 text-right">{stat.title}</p>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-2xl font-black text-slate-900">
                      {stat.isCurrency ? formatCurrencyValue(stat.value as number) : toArabicDigits(stat.value)}
                    </span>
                    {stat.isCurrency && <stat.icon className="h-5 w-5 text-primary opacity-80" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-7">
            {/* Chart - MD3 Tonal Surface */}
            <Card className="lg:col-span-4 bg-white/80 border-none shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="p-6 pb-0 text-right">
                <div className="flex flex-row-reverse items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-800">تحليل الأداء المالي</CardTitle>
                    <CardDescription className="text-[10px] font-medium">مقارنة الإيرادات والمصروفات خلال الأشهر الماضية</CardDescription>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[280px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={8}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#94A3B8" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        fontFamily="Noto Kufi Arabic"
                        dy={10}
                      />
                      <YAxis 
                        stroke="#94A3B8" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => toArabicDigits(`${value/1000}ألف`)}
                        fontFamily="Noto Kufi Arabic"
                      />
                      <Tooltip 
                        cursor={{fill: '#F8FAFC', radius: 12}}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-2xl border-none bg-white p-4 shadow-xl text-right ring-1 ring-black/5">
                                <p className="text-xs font-black mb-2 text-slate-800">{payload[0].payload.month}</p>
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-[10px] font-bold text-slate-500">الإيرادات:</span>
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-black text-primary">{formatCurrencyValue(payload[0].value as number)}</span>
                                      <SaudiRiyalIcon className="size-3 text-primary" />
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-[10px] font-bold text-slate-500">المصروفات:</span>
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-black text-rose-500">{formatCurrencyValue(payload[1].value as number)}</span>
                                      <SaudiRiyalIcon className="size-3 text-rose-500" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 8, 8]} barSize={24} />
                      <Bar dataKey="expense" fill="#FDA4AF" radius={[8, 8, 8, 8]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity - MD3 List */}
            <Card className="lg:col-span-3 bg-white/80 border-none shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="p-6 text-right">
                <CardTitle className="text-sm font-bold text-slate-800">آخر العمليات</CardTitle>
                <CardDescription className="text-[10px] font-medium">تتبع مباشر للأنشطة التشغيلية</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-6">
                  {[
                    { title: "تجديد عقد إيجار", sub: "مبنى الجوهرة - وحدة ٠٤", time: "قبل ساعتين", iconColor: "bg-blue-500" },
                    { title: "صيانة أسطول", sub: "شاحنة نقل رقم ٤٥٢", time: "قبل ٥ ساعات", iconColor: "bg-amber-500" },
                    { title: "تعيين موظف", sub: "سارة محمد - محاسبة", time: "أمس", iconColor: "bg-indigo-500" },
                    { title: "سداد زكاة", sub: "دفعة الربع الأول ١٤٤٥", time: "منذ يومين", iconColor: "bg-primary" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">{toArabicDigits(item.time)}</div>
                      <div className="flex-1 space-y-0.5 text-right">
                        <p className="text-xs font-bold text-slate-800">{item.title}</p>
                        <p className="text-[10px] text-muted-foreground font-medium line-clamp-1">{item.sub}</p>
                      </div>
                      <div className={`size-8 rounded-xl ${item.iconColor} flex items-center justify-center text-white shrink-0`}>
                        <div className="size-1.5 bg-white rounded-full" />
                      </div>
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
