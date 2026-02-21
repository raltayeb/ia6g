"use client";

import { useState } from "react";
import { ShieldCheck, Download, Calculator, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toArabicDigits } from "@/lib/utils";

export default function ZakatPage() {
  const [year, setYear] = useState("2024");
  
  const zakatAssets = {
    realEstate: 35000000,
    fleet: 12000000,
    cash: 8500000,
    accountsReceivable: 4200000
  };

  const totalWealth = Object.values(zakatAssets).reduce((a, b) => a + b, 0);
  const zakatAmount = totalWealth * 0.025;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="font-headline text-lg font-bold text-primary">الزكاة والضريبة</h1>
          </div>
          <div className="flex gap-2">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[130px] rounded-xl text-xs bg-white/80">
                <SelectValue placeholder="السنة" />
              </SelectTrigger>
              <SelectContent className="rounded-xl font-headline">
                <SelectItem value="2024" className="text-xs">١٤٤٥ هـ</SelectItem>
                <SelectItem value="2023" className="text-xs">١٤٤٤ هـ</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 rounded-xl border-slate-200 bg-white/80 text-xs">
              <Download className="h-4 w-4" />
              تقرير ZATCA
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <Alert className="bg-primary/5 border-primary/10 rounded-2xl">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-bold text-xs text-right">تنبيه الامتثال للزكاة والضريبة</AlertTitle>
            <AlertDescription className="text-primary/70 text-[10px] text-right">
              تستند الحسابات أدناه إلى النسبة القياسية (٢.٥٪) وفقاً لإرشادات هيئة الزكاة والضريبة والجمارك.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 border-none shadow-sm rounded-3xl bg-white/80 overflow-hidden">
              <CardHeader className="p-6 text-right">
                <CardTitle className="flex flex-row-reverse items-center gap-2 text-sm font-bold">
                  <Calculator className="h-4 w-4 text-primary" />
                  ملخص تقييم الأصول
                </CardTitle>
                <CardDescription className="text-[10px]">تفاصيل الأصول الخاضعة للزكاة للفترة الحالية</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                <div className="space-y-5">
                  {[
                    { label: "محفظة العقارات المملوكة", value: zakatAssets.realEstate, percentage: 60 },
                    { label: "الأسطول والمعدات الثقيلة", value: zakatAssets.fleet, percentage: 20 },
                    { label: "السيولة (أرصدة البنوك)", value: zakatAssets.cash, percentage: 15 },
                    { label: "الفواتير المستحقة (المدينون)", value: zakatAssets.accountsReceivable, percentage: 5 },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex flex-row-reverse justify-between text-xs">
                        <span className="font-bold">{item.label}</span>
                        <span className="font-mono text-[11px]">{toArabicDigits(item.value.toLocaleString())} ر.س</span>
                      </div>
                      <Progress value={item.percentage} className="h-1.5" />
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-slate-100 flex flex-row-reverse justify-between items-end">
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-black">إجمالي الثروة</p>
                    <p className="text-2xl font-black">{toArabicDigits(totalWealth.toLocaleString())} ر.س</p>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-emerald-600 font-bold uppercase">الزكاة المستحقة</p>
                    <p className="text-2xl font-black text-emerald-600">{toArabicDigits(zakatAmount.toLocaleString())} ر.س</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-primary text-primary-foreground border-none shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="p-6 text-right">
                  <CardTitle className="flex flex-row-reverse items-center gap-2 text-sm font-bold">
                    <ShieldCheck className="h-4 w-4" />
                    حالة الإقرار
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4 text-right">
                  <div className="p-3 bg-white/10 rounded-2xl">
                    <p className="text-[9px] uppercase opacity-70">المرحلة الحالية</p>
                    <p className="text-base font-bold">تسوية البيانات</p>
                  </div>
                  <div className="flex flex-row-reverse items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-[10px] font-medium">في انتظار التدقيق الخارجي</span>
                  </div>
                  <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold text-xs rounded-xl h-10 mt-2">
                    تقديم الإقرار
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-3xl bg-white/80 overflow-hidden">
                <CardHeader className="p-4 text-right">
                  <CardTitle className="text-xs font-bold">سجل الزكاة التاريخي</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-4">
                  {[
                    { year: "١٤٤٤ هـ", amount: "١,٢٤٠,٠٠٠ ر.س", status: "مدفوع" },
                    { year: "١٤٤٣ هـ", amount: "١,١٨٠,٠٠٠ ر.س", status: "مدفوع" },
                  ].map((h) => (
                    <div key={h.year} className="flex flex-row-reverse justify-between items-center text-xs border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <div className="text-right">
                        <p className="font-bold text-[11px]">{h.year}</p>
                        <p className="text-[9px] text-muted-foreground">{h.amount}</p>
                      </div>
                      <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-100 text-[9px] font-bold rounded-lg">
                        {h.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
