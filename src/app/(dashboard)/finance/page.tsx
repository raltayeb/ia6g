"use client";

import { Plus, Download, Search, ArrowUpRight, ArrowDownRight, FileText, TrendingUp, Filter } from "lucide-react";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { Transaction } from "@/types/erp";

const mockTransactions: Transaction[] = [
  { id: "T1", date: "2024-05-01", description: "إيجار شهري - ساحة الوحدة ٣", amount: 15000, type: "Income", category: "Property" },
  { id: "T2", date: "2024-05-02", description: "مصاريف وقود الأسطول - جملة", amount: 4200, type: "Expense", category: "Fleet" },
  { id: "T3", date: "2024-05-03", description: "صيانة سكن العمال", amount: 1200, type: "Expense", category: "HR" },
  { id: "T4", date: "2024-05-04", description: "أتعاب استشارية - قانونية", amount: 3500, type: "Expense", category: "Other" },
  { id: "T5", date: "2024-05-05", description: "دفعة مقدمة - مشروع جديد", amount: 50000, type: "Income", category: "Other" },
];

export default function FinancePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-black text-primary">الحسابات والمالية</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 rounded-xl bg-white/80 border-none h-9 px-4 text-xs font-bold">
              <Download className="h-4 w-4" />
              تصدير
            </Button>
            <Button size="sm" className="gap-2 rounded-xl shadow-sm font-bold h-9" >
              <Plus className="h-4 w-4" />
              عملية جديدة
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">الرصيد الإجمالي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xl font-black">{formatCurrencyValue(2450000)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-70" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">الدخل الشهري</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xl font-black text-emerald-600">+{formatCurrencyValue(85200)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-emerald-600 opacity-70" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-rose-600 uppercase tracking-widest">المصروفات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xl font-black text-rose-600">-{formatCurrencyValue(32400)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-rose-600 opacity-70" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-primary text-primary-foreground">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black opacity-80 uppercase tracking-widest">صافي الربح</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xl font-black">{formatCurrencyValue(52800)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="bg-white/50 backdrop-blur-sm p-1 rounded-2xl h-11 mb-6 border-none shadow-sm">
              <TabsTrigger value="transactions" className="px-8 text-[11px] font-black rounded-xl data-[state=active]:shadow-sm data-[state=active]:bg-white">العمليات</TabsTrigger>
              <TabsTrigger value="invoices" className="px-8 text-[11px] font-black rounded-xl data-[state=active]:shadow-sm data-[state=active]:bg-white">الفواتير</TabsTrigger>
              <TabsTrigger value="ledger" className="px-8 text-[11px] font-black rounded-xl data-[state=active]:shadow-sm data-[state=active]:bg-white">دفتر الأستاذ</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث في العمليات..." className="pr-10 h-10 rounded-2xl border-none bg-white/80 text-xs" dir="rtl" />
                </div>
              </div>

              <Card className="rounded-3xl border-none bg-white/80 overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">التاريخ</TableHead>
                      <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الوصف</TableHead>
                      <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الفئة</TableHead>
                      <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">المبلغ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((tx) => (
                      <TableRow key={tx.id} className="hover:bg-muted/30 transition-colors border-b border-slate-100/50 last:border-0">
                        <TableCell className="text-right text-[11px] font-mono text-muted-foreground">{toArabicDigits(tx.date)}</TableCell>
                        <TableCell className="text-right font-bold text-xs">{tx.description}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary" className="rounded-lg font-bold text-[9px] px-3 py-0.5 border-none bg-slate-100 text-slate-600">
                            {tx.category === 'Property' ? 'عقارات' : tx.category === 'Fleet' ? 'أسطول' : 'أخرى'}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-right font-black text-xs ${tx.type === "Income" ? "text-emerald-600" : "text-rose-600"}`}>
                          <div className="flex items-center gap-1 justify-end">
                            {tx.type === "Income" ? "+" : "-"} {formatCurrencyValue(tx.amount)}
                            <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-60" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="invoices">
              <Card className="rounded-3xl border-none shadow-sm py-20 bg-white/80">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="p-4 bg-slate-50 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-bold">لا توجد فواتير نشطة</h3>
                  <p className="text-[10px] text-muted-foreground mt-1">لم يتم إصدار أي مطالبات مالية لهذا الشهر.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
