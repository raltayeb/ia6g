"use client";

import { useState } from "react";
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
  CheckCircle2,
  Clock,
  AlertCircle,
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
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area
} from "recharts";
import { toArabicDigits, formatCurrencyValue, toHijriDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const financialData = [
  { month: "محرم", revenue: 45000, expense: 32000 },
  { month: "صفر", revenue: 52000, expense: 31000 },
  { month: "ربيع ١", revenue: 48000, expense: 35000 },
  { month: "ربيع ٢", revenue: 61000, expense: 38000 },
  { month: "جمادى ١", revenue: 55000, expense: 42000 },
  { month: "جمادى ٢", revenue: 67000, expense: 40000 },
];

const growthData = [
  { month: "محرم", value: 3000000 },
  { month: "صفر", value: 3200000 },
  { month: "ربيع ١", value: 3150000 },
  { month: "ربيع ٢", value: 3500000 },
  { month: "جمادى ١", value: 3800000 },
  { month: "جمادى ٢", value: 4200000 },
];

const distributionData = [
  { name: "سكني", value: 45 },
  { name: "تجاري", value: 30 },
  { name: "صناعي", value: 25 },
];

const stats = [
  { title: "العقارات", value: 24, icon: Building2, trend: "+٢", color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "الأسطول", value: 58, icon: Car, trend: "+٥", color: "text-blue-600", bg: "bg-blue-50" },
  { title: "الموظفين", value: 142, icon: Users, trend: "+١٢", color: "text-amber-600", bg: "bg-amber-50" },
  { title: "الإيرادات", value: 1200000, isCurrency: true, icon: Wallet, trend: "+١٢.٥٪", color: "text-emerald-700", bg: "bg-emerald-100" },
];

const tasks = [
  { id: 1, title: "تجديد رخص السير - أسطول جدة", status: "معلق", priority: "عالية" },
  { id: 2, title: "تحصيل إيجارات مجمع السلام", status: "قيد التنفيذ", priority: "متوسطة" },
  { id: 3, title: "صيانة دورية للمصاعد - برج العليا", status: "مكتمل", priority: "منخفضة" },
];

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8F9FA]">
        <header className="m3-header">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 text-primary" />
            <div className="flex flex-col items-start">
              <h1 className="text-sm font-medium text-primary">لوحة التحكم</h1>
              <span className="text-[10px] font-medium text-muted-foreground">{toHijriDate()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="بحث سريع..." className="h-8 w-64 pr-8 rounded-full bg-slate-100 border-none text-xs" dir="rtl" />
            </div>
            <Button variant="ghost" size="icon" className="rounded-full relative h-9 w-9 hover:bg-slate-100">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 left-2 h-1.5 w-1.5 bg-destructive rounded-full" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6" dir="rtl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="m3-card group border-none">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-0 mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge variant="secondary" className="rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border-none px-3">
                    {toArabicDigits(stat.trend)}
                  </Badge>
                </CardHeader>
                <CardContent className="p-0 text-right">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                  <div className="flex items-center gap-1 mt-1 justify-start flex-row-reverse">
                    <span className="text-xl font-medium">
                      {stat.isCurrency ? formatCurrencyValue(stat.value as number) : toArabicDigits(stat.value)}
                    </span>
                    {stat.isCurrency && <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-60" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <Card className="m3-card overflow-hidden border-none">
                <CardHeader className="px-0 py-0 flex flex-row items-center justify-between mb-6">
                  <div className="text-right">
                    <CardTitle className="text-sm font-medium">الأداء المالي</CardTitle>
                    <CardDescription className="text-[10px]">مقارنة الإيرادات بالمصروفات التشغيلية</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[10px] font-medium gap-1 rounded-full hover:bg-slate-50">
                    تصدير التقرير
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[220px]" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={financialData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
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
                          contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', textAlign: 'right' }}
                          itemStyle={{ fontSize: '10px', fontWeight: '500' }}
                        />
                        <Bar dataKey="revenue" fill="oklch(var(--primary))" radius={[6, 6, 0, 0]} barSize={24} />
                        <Bar dataKey="expense" fill="oklch(var(--primary) / 0.3)" radius={[6, 6, 0, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="m3-card overflow-hidden border-none bg-white">
                <CardHeader className="px-0 py-0 flex flex-row items-center justify-between mb-6">
                  <div className="text-right">
                    <CardTitle className="text-sm font-medium">نمو قيمة الأصول</CardTitle>
                    <CardDescription className="text-[10px]">تقدير القيمة السوقية للمحفظة العقارية</CardDescription>
                  </div>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[220px]" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={growthData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(var(--primary))" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="oklch(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
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
                          tickFormatter={(value) => toArabicDigits(`${(value/1000000).toFixed(1)}م`)}
                        />
                        <Tooltip 
                          contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', textAlign: 'right' }}
                          itemStyle={{ fontSize: '10px', fontWeight: '500' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="oklch(var(--primary))" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <Card className="m3-card border-none">
                <CardHeader className="p-0 mb-4 text-right">
                  <CardTitle className="text-sm font-medium">توزيع الأصول</CardTitle>
                  <CardDescription className="text-[10px]">حسب نوع العقار</CardDescription>
                </CardHeader>
                <CardContent className="p-0 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {distributionData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={
                              index === 0 ? "oklch(var(--primary))" : 
                              index === 1 ? "oklch(var(--primary) / 0.6)" : 
                              "oklch(var(--primary) / 0.3)"
                            } 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', textAlign: 'right' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-2">
                    {distributionData.map((item, i) => (
                      <div key={i} className="flex items-center gap-1 text-[9px] font-medium">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ 
                            backgroundColor: i === 0 ? "oklch(var(--primary))" : 
                                            i === 1 ? "oklch(var(--primary) / 0.6)" : 
                                            "oklch(var(--primary) / 0.3)" 
                          }} 
                        />
                        {item.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="m3-card border-none">
                <CardHeader className="p-0 mb-4 text-right">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">المهام العاجلة</CardTitle>
                    <Clock className="h-4 w-4 opacity-60 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem({ type: 'Task', ...task })}
                    >
                      <div className="text-right">
                        <p className="text-[11px] font-medium">{task.title}</p>
                        <Badge variant="outline" className="text-[8px] mt-1 border-none bg-white px-2 text-primary">
                          أولوية {task.priority}
                        </Badge>
                      </div>
                      {task.status === 'مكتمل' ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">تفاصيل السجل</SheetTitle>
              <SheetDescription className="text-xs">معلومات مفصلة عن النشاط المحدد</SheetDescription>
            </SheetHeader>
            {selectedItem && (
              <div className="space-y-6 text-right">
                <div className="p-4 bg-slate-50 rounded-2xl space-y-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">الموضوع</p>
                    <p className="text-sm font-medium">{selectedItem.title || selectedItem.name}</p>
                  </div>
                  {selectedItem.status && (
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase">الحالة</p>
                      <Badge className="rounded-full bg-emerald-50 text-emerald-700 border-none mt-1">{selectedItem.status}</Badge>
                    </div>
                  )}
                </div>
                <Button className="w-full rounded-full h-11" onClick={() => setSelectedItem(null)}>إغلاق</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
