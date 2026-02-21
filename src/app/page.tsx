"use client";

import { 
  Building2, 
  Car, 
  Users, 
  ArrowUpRight,
  Wallet,
  TrendingUp,
  Activity,
  Bell,
  Search,
  ChevronRight
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
  { title: "العقارات", value: 24, icon: Building2, trend: "+٢", color: "text-emerald-600", bg: "bg-emerald-100/50" },
  { title: "الأسطول", value: 58, icon: Car, trend: "+٥", color: "text-blue-600", bg: "bg-blue-100/50" },
  { title: "الموظفين", value: 142, icon: Users, trend: "+١٢", color: "text-amber-600", bg: "bg-amber-100/50" },
  { title: "الإيرادات", value: 1200000, isCurrency: true, icon: Wallet, trend: "+١٢.٥٪", color: "text-emerald-700", bg: "bg-emerald-200/50" },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-20 shrink-0 items-center justify-between gap-4 px-8 sticky top-0 bg-background/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-6 flex-1">
            <SidebarTrigger className="h-10 w-10 rounded-full hover:bg-secondary transition-all" />
            <div className="relative w-full max-w-md group group-data-[collapsible=icon]:hidden">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="ابحث في العقارات، المركبات أو الموظفين..." 
                className="w-full pr-11 h-12 bg-secondary/50 border-none rounded-full focus-visible:ring-2 focus-visible:ring-primary/20 text-sm font-medium"
                dir="rtl"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end group-data-[collapsible=icon]:hidden">
              <span className="text-[10px] font-black text-primary uppercase tracking-tighter">{toHijriDate()}</span>
              <span className="text-xs font-bold text-muted-foreground">صباح الخير، مدير النظام</span>
            </div>
            <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-3 left-3 h-2 w-2 bg-destructive rounded-full border-2 border-background" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-8 p-8 pt-4">
          {/* M3 Hero Section */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="m3-card group hover:bg-primary/5 transition-all cursor-pointer">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                  <div className={`p-4 rounded-3xl ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 text-primary text-[10px] font-black">
                    {toArabicDigits(stat.trend)}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-widest">{stat.title}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-3xl font-black tracking-tighter">
                      {stat.isCurrency ? formatCurrencyValue(stat.value as number) : toArabicDigits(stat.value)}
                    </span>
                    {stat.isCurrency && <SaudiRiyalIcon className="h-5 w-5 text-primary opacity-60" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <Card className="lg:col-span-8 rounded-[32px] border-none bg-card shadow-sm overflow-hidden">
              <CardHeader className="px-8 py-6 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-black text-foreground">الأداء المالي</CardTitle>
                  <CardDescription className="text-xs font-medium text-muted-foreground mt-1">مقارنة الإيرادات بالمصروفات التشغيلية</CardDescription>
                </div>
                <Button variant="secondary" className="rounded-full gap-2 text-xs font-bold px-6">
                  عرض التقرير الكامل
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-4">
                <div className="h-[320px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="oklch(var(--border))" opacity={0.5} />
                      <XAxis 
                        dataKey="month" 
                        stroke="oklch(var(--muted-foreground))" 
                        fontSize={11} 
                        fontWeight={700}
                        tickLine={false} 
                        axisLine={false} 
                        tick={{dy: 15}}
                      />
                      <YAxis 
                        stroke="oklch(var(--muted-foreground))" 
                        fontSize={11} 
                        fontWeight={700}
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => toArabicDigits(`${value/1000}ألف`)}
                      />
                      <Tooltip 
                        cursor={{fill: 'oklch(var(--secondary))', radius: 12}}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-[20px] bg-background p-4 shadow-2xl border-none text-right min-w-[160px]">
                                <p className="text-xs font-black mb-3 border-b border-primary/5 pb-2 text-primary">{payload[0].payload.month}</p>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center gap-6">
                                    <span className="text-[10px] font-bold text-muted-foreground">الإيرادات</span>
                                    <span className="text-xs font-black text-primary">{formatCurrencyValue(payload[0].value as number)} ر.س</span>
                                  </div>
                                  <div className="flex justify-between items-center gap-6">
                                    <span className="text-[10px] font-bold text-muted-foreground">المصروفات</span>
                                    <span className="text-xs font-black text-rose-500">{formatCurrencyValue(payload[1].value as number)} ر.س</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="revenue" fill="oklch(var(--primary))" radius={[12, 12, 12, 12]} barSize={36} />
                      <Bar dataKey="expense" fill="oklch(var(--accent))" radius={[12, 12, 12, 12]} barSize={36} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <Card className="rounded-[32px] border-none bg-primary text-primary-foreground shadow-xl shadow-primary/20 overflow-hidden">
                <CardHeader className="px-8 pt-8 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-black">النشاط الأخير</CardTitle>
                    <Activity className="h-5 w-5 opacity-60" />
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-8">
                  <div className="space-y-2">
                    {[
                      { title: "تجديد عقد", sub: "مجمع السلام - و ٤", time: "٢س", color: "bg-white/20" },
                      { title: "صيانة مركبة", sub: "تويوتا - أ ب ج", time: "٥س", color: "bg-white/10" },
                      { title: "تعيين جديد", sub: "سارة م. - محاسبة", time: "١٠س", color: "bg-white/10" },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center gap-4 p-4 rounded-3xl transition-all cursor-pointer hover:bg-white/20 ${item.color}`}>
                        <div className="flex-1">
                          <p className="text-sm font-bold leading-none">{item.title}</p>
                          <p className="text-[10px] opacity-70 font-medium mt-1">{item.sub}</p>
                        </div>
                        <div className="text-[10px] font-black bg-white/30 px-2 py-1 rounded-full">{toArabicDigits(item.time)}</div>
                      </div>
                    ))}
                  </div>
                  <Button variant="secondary" className="w-full mt-6 rounded-full h-12 bg-white text-primary hover:bg-white/90 font-black text-xs gap-2">
                    مشاهدة الكل
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-[32px] border-none bg-secondary/50 p-8 flex items-center justify-between group cursor-pointer hover:bg-secondary transition-all">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">حالة النظام</span>
                  <span className="text-sm font-bold text-foreground">جميع الخدمات تعمل بكفاءة</span>
                </div>
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}