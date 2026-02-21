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
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b sticky top-0 bg-background/95 backdrop-blur z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-sm font-bold tracking-tight">الحسابات والمالية</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 h-8 font-bold border-muted">
              <Download className="h-3.5 w-3.5" />
              تصدير
            </Button>
            <Button size="sm" className="gap-2 h-8 font-bold">
              <Plus className="h-3.5 w-3.5" />
              عملية جديدة
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="rounded-xl border shadow-none bg-blue-50/30">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">الرصيد الإجمالي</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-black">{formatCurrencyValue(2450000)}</span>
                    <SaudiRiyalIcon className="h-4 w-4 text-blue-600 opacity-70" />
                  </div>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-xl border shadow-none bg-emerald-50/30">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">الدخل الشهري</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-black text-emerald-600">+{formatCurrencyValue(85200)}</span>
                    <SaudiRiyalIcon className="h-4 w-4 text-emerald-600 opacity-70" />
                  </div>
                </div>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-xl border shadow-none bg-rose-50/30">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">المصروفات</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-black text-rose-600">-{formatCurrencyValue(32400)}</span>
                    <SaudiRiyalIcon className="h-4 w-4 text-rose-600 opacity-70" />
                  </div>
                </div>
                <div className="p-2 bg-rose-100 rounded-lg">
                  <ArrowDownRight className="h-4 w-4 text-rose-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-xl border shadow-none bg-primary text-primary-foreground">
              <CardContent className="p-4 flex items-center justify-between h-full">
                <div className="text-right">
                  <p className="text-[10px] opacity-80 font-bold uppercase mb-1">صافي الربح</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-black">{formatCurrencyValue(52800)}</span>
                    <SaudiRiyalIcon className="h-4 w-4 opacity-80" />
                  </div>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="bg-muted/50 p-1 rounded-lg h-10 mb-6">
              <TabsTrigger value="transactions" className="px-6 text-xs font-bold rounded-md data-[state=active]:shadow-none">العمليات</TabsTrigger>
              <TabsTrigger value="invoices" className="px-6 text-xs font-bold rounded-md data-[state=active]:shadow-none">الفواتير</TabsTrigger>
              <TabsTrigger value="ledger" className="px-6 text-xs font-bold rounded-md data-[state=active]:shadow-none">دفتر الأستاذ</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث في العمليات..." className="pr-10 h-9 text-xs rounded-lg" />
                </div>
                <Button variant="outline" size="sm" className="gap-2 h-9 text-xs rounded-lg">
                  <Filter className="h-3.5 w-3.5" />
                  تصفية
                </Button>
              </div>

              <Card className="rounded-xl border shadow-none overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">التاريخ</TableHead>
                      <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الوصف</TableHead>
                      <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الفئة</TableHead>
                      <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">النوع</TableHead>
                      <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">المبلغ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((tx) => (
                      <TableRow key={tx.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="text-right text-[11px] font-mono text-muted-foreground">{toArabicDigits(tx.date)}</TableCell>
                        <TableCell className="text-right font-bold text-xs">{tx.description}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="rounded-md font-bold text-[9px] px-2 py-0.5 border-muted">
                            {tx.category === 'Property' ? 'عقارات' : tx.category === 'Fleet' ? 'أسطول' : tx.category === 'HR' ? 'موارد بشرية' : 'أخرى'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className={`flex items-center gap-1 text-[10px] font-bold justify-end ${tx.type === "Income" ? "text-emerald-600" : "text-rose-600"}`}>
                            {tx.type === 'Income' ? 'إيراد' : 'مصروف'}
                            {tx.type === "Income" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          </div>
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
              <Card className="rounded-xl border shadow-none py-20 bg-muted/10">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="p-4 bg-muted rounded-full mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-bold">لا توجد فواتير نشطة</h3>
                  <p className="text-[11px] text-muted-foreground max-w-[240px] mt-1">
                    لم يتم إصدار أي مطالبات مالية لهذا الشهر.
                  </p>
                  <Button className="mt-6 gap-2 rounded-lg font-bold" size="sm">
                    <Plus className="h-3.5 w-3.5" />
                    إصدار فاتورة جديدة
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
