"use client";

import { Plus, Download, Search, Filter, ArrowUpRight, ArrowDownRight, FileText, TrendingUp } from "lucide-react";
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
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="font-headline text-lg font-bold text-primary">الإدارة المالية</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 rounded-xl border-slate-200 bg-white/80">
              <Download className="h-4 w-4" />
              تصدير
            </Button>
            <Button className="gap-2 rounded-xl">
              <Plus className="h-4 w-4" />
              عملية جديدة
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white/80">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mb-1">الرصيد الإجمالي</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-black">{formatCurrencyValue(2450000)}</span>
                    <SaudiRiyalIcon className="h-4 w-4 text-blue-600 opacity-80" />
                  </div>
                </div>
                <div className="p-2.5 bg-blue-50 rounded-2xl">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white/80">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mb-1">الدخل الشهري</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-black text-emerald-600">+{formatCurrencyValue(85200)}</span>
                    <SaudiRiyalIcon className="h-4 w-4 text-emerald-600 opacity-80" />
                  </div>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-2xl">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white/80">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mb-1">المصروفات</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-black text-rose-600">-{formatCurrencyValue(32400)}</span>
                    <SaudiRiyalIcon className="h-4 w-4 text-rose-600 opacity-80" />
                  </div>
                </div>
                <div className="p-2.5 bg-rose-50 rounded-2xl">
                  <ArrowDownRight className="h-4 w-4 text-rose-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-primary text-primary-foreground">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[9px] opacity-80 uppercase font-black tracking-widest mb-1">صافي الربح</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-black">{formatCurrencyValue(52800)}</span>
                    <SaudiRiyalIcon className="h-4 w-4 opacity-80" />
                  </div>
                </div>
                <div className="p-2.5 bg-white/20 rounded-2xl">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="space-y-4">
            <TabsList className="rounded-2xl p-1 bg-white/50 backdrop-blur-sm border-none shadow-sm h-10">
              <TabsTrigger value="transactions" className="rounded-xl font-bold px-6 text-xs">العمليات</TabsTrigger>
              <TabsTrigger value="invoices" className="rounded-xl font-bold px-6 text-xs">الفواتير</TabsTrigger>
              <TabsTrigger value="ledger" className="rounded-xl font-bold px-6 text-xs">دفتر الأستاذ</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث في العمليات..." className="pr-9 rounded-xl border-slate-200 bg-white/80" />
                </div>
                <Button variant="ghost" className="gap-2 rounded-xl text-xs">
                  <Filter className="h-4 w-4" />
                  الفلترة
                </Button>
              </div>

              <div className="rounded-3xl border-none bg-white/80 overflow-hidden shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead className="text-right font-bold text-xs">التاريخ</TableHead>
                      <TableHead className="text-right font-bold text-xs">الوصف</TableHead>
                      <TableHead className="text-right font-bold text-xs">الفئة</TableHead>
                      <TableHead className="text-right font-bold text-xs">النوع</TableHead>
                      <TableHead className="text-right font-bold text-xs">المبلغ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((tx) => (
                      <TableRow key={tx.id} className="hover:bg-muted/30 transition-colors border-b border-slate-100/50 last:border-0">
                        <TableCell className="text-right text-[11px] font-mono">{toArabicDigits(tx.date)}</TableCell>
                        <TableCell className="text-right font-medium text-xs">{tx.description}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="rounded-lg font-bold text-[9px] px-2 py-0">
                            {tx.category === 'Property' ? 'عقارات' : tx.category === 'Fleet' ? 'أسطول' : tx.category === 'HR' ? 'موارد بشرية' : 'أخرى'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className={`flex items-center gap-1 text-[9px] font-black justify-end ${tx.type === "Income" ? "text-emerald-600" : "text-rose-600"}`}>
                            {tx.type === 'Income' ? 'دخل' : 'مصروف'}
                            {tx.type === "Income" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          </div>
                        </TableCell>
                        <TableCell className={`text-right font-black text-xs ${tx.type === "Income" ? "text-emerald-600" : "text-rose-600"}`}>
                          <div className="flex items-center gap-1 justify-end">
                            {tx.type === "Income" ? "+" : "-"} {formatCurrencyValue(tx.amount)}
                            <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-70" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="invoices">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white/80 py-16">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="p-5 bg-slate-100 rounded-3xl mb-4">
                    <FileText className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-black">لا توجد فواتير نشطة</h3>
                  <p className="text-xs text-muted-foreground max-w-[240px] mt-1 font-medium">
                    لم يتم إصدار أي مطالبات مالية لهذا الشهر الهجري.
                  </p>
                  <Button className="mt-6 gap-2 rounded-xl px-8 shadow-sm text-xs">
                    <Plus className="h-4 w-4" />
                    إصدار فاتورة
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
