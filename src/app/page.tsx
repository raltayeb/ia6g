
"use client";

import { useState } from "react";
import { 
  Building2, 
  Car, 
  Users, 
  Wallet,
  Bell,
  CheckCircle2,
  Clock,
  Briefcase,
  CheckSquare,
  TrendingUp,
  Target,
  ArrowUpRight,
  MoreVertical,
  Eye
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
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// بيانات الرسوم البيانية - موحدة باللون الأخضر
const financialData = [
  { name: "محرم", revenue: 45000, expense: 32000 },
  { name: "صفر", revenue: 52000, expense: 31000 },
  { name: "ربيع ١", revenue: 48000, expense: 35000 },
  { name: "ربيع ٢", revenue: 61000, expense: 38000 },
  { name: "جمادى ١", revenue: 55000, expense: 42000 },
  { name: "جمادى ٢", revenue: 67000, expense: 40000 },
];

const crmPipeline = [
  { stage: "جديد", count: 45 },
  { stage: "تواصل", count: 32 },
  { stage: "مؤهل", count: 24 },
  { stage: "عرض", count: 18 },
  { stage: "تعاقد", count: 12 },
];

const taskDistribution = [
  { name: "مكتملة", value: 400 },
  { name: "قيد التنفيذ", value: 300 },
  { name: "معلقة", value: 200 },
  { name: "متأخرة", value: 100 },
];

const growthData = [
  { month: "محرم", value: 3000000 },
  { month: "صفر", value: 3200000 },
  { month: "ربيع ١", value: 3150000 },
  { month: "ربيع ٢", value: 3500000 },
  { month: "جمادى ١", value: 3800000 },
  { month: "جمادى ٢", value: 4200000 },
];

const COLORS = ['#10b981', '#059669', '#047857', '#065f46'];

const stats = [
  { title: "العملاء الجدد", value: 12, icon: Target, trend: "+٣", color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "المهام المفتوحة", value: 24, icon: CheckSquare, trend: "-٥", color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "الموظفين", value: 142, icon: Users, trend: "+١٢", color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "الإيرادات", value: 1200000, isCurrency: true, icon: Wallet, trend: "+١٢.٥٪", color: "text-emerald-700", bg: "bg-emerald-100" },
];

const recentLeads = [
  { id: "L1", company: "شركة الرواد", contact: "سليمان ق.", value: 125000, status: "عرض" },
  { id: "L2", company: "مجموعة المجد", contact: "فاطمة أ.", value: 450000, status: "مؤهل" },
  { id: "L3", company: "مؤسسة النجاح", contact: "محمد ع.", value: 85000, status: "تعاقد" },
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
              <h1 className="text-sm font-medium text-primary">لوحة التحكم الإدارية</h1>
              <span className="text-[10px] font-medium text-muted-foreground">{toHijriDate()}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full relative h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 left-2 h-1.5 w-1.5 bg-destructive rounded-full" />
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6" dir="rtl">
          {/* بطاقات الإحصائيات */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="m3-card border-none">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-0 mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge variant="secondary" className="rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border-none">
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

          {/* الرسوم البيانية - الجزء العلوي */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="m3-card border-none">
              <CardHeader className="p-0 mb-6 text-right">
                <CardTitle className="text-sm font-medium">الأداء المالي السنوي</CardTitle>
                <CardDescription className="text-[10px]">مقارنة الإيرادات بالمصروفات</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[250px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => toArabicDigits(`${v/1000}ك`)} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', textAlign: 'right', fontSize: '10px' }} />
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                    <Bar dataKey="expense" fill="#a7f3d0" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="m3-card border-none">
              <CardHeader className="p-0 mb-6 text-right">
                <CardTitle className="text-sm font-medium">قمع مبيعات CRM</CardTitle>
                <CardDescription className="text-[10px]">توزيع العملاء المحتملين حسب المرحلة</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[250px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={crmPipeline} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="stage" type="category" fontSize={10} tickLine={false} axisLine={false} width={60} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', textAlign: 'right', fontSize: '10px' }} />
                    <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20}>
                      {crmPipeline.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* الرسوم البيانية - الجزء السفلي والمهام */}
          <div className="grid gap-6 lg:grid-cols-3">
             <Card className="m3-card border-none lg:col-span-1">
              <CardHeader className="p-0 mb-6 text-right">
                <CardTitle className="text-sm font-medium">حالة المهام</CardTitle>
                <CardDescription className="text-[10px]">توزيع العمليات الجارية</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[220px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="m3-card border-none lg:col-span-2">
              <CardHeader className="p-0 mb-6 text-right">
                <CardTitle className="text-sm font-medium">نمو قيمة الأصول</CardTitle>
                <CardDescription className="text-[10px]">القيمة التقديرية للمحفظة العقارية والأسطول</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[220px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* جداول العمليات الحديثة */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="m3-card border-none">
              <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
                <div className="text-right">
                  <CardTitle className="text-sm font-medium">أحدث الفرص البيعية</CardTitle>
                  <CardDescription className="text-[10px]">نشاط CRM الأخير</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] font-medium">عرض الكل</Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="border-none">
                      <TableHead className="text-right text-[10px] font-medium py-3">الشركة</TableHead>
                      <TableHead className="text-right text-[10px] font-medium py-3">المرحلة</TableHead>
                      <TableHead className="text-right text-[10px] font-medium py-3">القيمة</TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentLeads.map((lead) => (
                      <TableRow key={lead.id} className="m3-table-row cursor-pointer" onClick={() => setSelectedItem(lead)}>
                        <TableCell className="text-right py-3">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-medium">{lead.company}</span>
                            <span className="text-[9px] text-muted-foreground">{lead.contact}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <Badge variant="secondary" className="text-[8px] bg-emerald-50 text-emerald-700 border-none rounded-lg px-2">
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right py-3 text-[10px] font-medium">{toArabicDigits(lead.value.toLocaleString())} ر.س</TableCell>
                        <TableCell className="py-3">
                          <MoreVertical className="h-3 w-3 text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="m3-card border-none">
              <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
                <div className="text-right">
                  <CardTitle className="text-sm font-medium">المهام العاجلة</CardTitle>
                  <CardDescription className="text-[10px]">عمليات تتطلب انتباه فوري</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] font-medium">إدارة المهام</Button>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                {[
                  { title: "تجديد رخص أسطول جدة", due: "١٤٤٥/١٠/٠٨", priority: "عالية", category: "Fleet" },
                  { title: "مراجعة تقرير مبيعات ربيع ٢", due: "١٤٤٥/١٠/١٠", priority: "متوسطة", category: "CRM" },
                  { title: "صيانة مجمع السلام السكني", due: "١٤٤٥/١٠/٠٥", priority: "عالية", category: "Property" },
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer">
                    <div className="text-right">
                      <p className="text-[11px] font-medium">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[8px] border-none px-2 bg-emerald-100 text-emerald-800">
                          {task.category}
                        </Badge>
                        <span className="text-[9px] text-muted-foreground font-mono">{toArabicDigits(task.due)}</span>
                      </div>
                    </div>
                    <div className="p-2 bg-white rounded-full">
                      {task.priority === 'عالية' ? <Clock className="h-3.5 w-3.5 text-rose-500" /> : <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* نافذة تفاصيل سريعة */}
        <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">تفاصيل الفرصة البيعية</SheetTitle>
              <SheetDescription className="text-xs">بيانات العميل والصفقة في نظام CRM</SheetDescription>
            </SheetHeader>
            {selectedItem && (
              <div className="space-y-6 text-right">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] text-muted-foreground uppercase mb-1">اسم العميل</p>
                  <p className="text-sm font-medium">{selectedItem.company}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">المرحلة</p>
                    <Badge className="bg-emerald-50 text-emerald-700 border-none">{selectedItem.status}</Badge>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">القيمة</p>
                    <p className="text-sm font-medium text-emerald-600 font-mono">{toArabicDigits(selectedItem.value.toLocaleString())} ر.س</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] text-muted-foreground uppercase mb-1">المسؤول</p>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm font-medium">{selectedItem.contact}</span>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
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
