"use client";

import { useState } from "react";
import { Plus, Download, Search, ArrowUpRight, ArrowDownRight, FileText, TrendingUp, Filter, Loader2, Calendar, Tag, CreditCard } from "lucide-react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { Transaction } from "@/types/erp";
import { useToast } from "@/hooks/use-toast";

const transactionSchema = z.object({
  description: z.string().min(5, "الوصف يجب أن يكون ٥ أحرف على الأقل"),
  amount: z.coerce.number().min(1, "المبلغ يجب أن يكون أكبر من صفر"),
  type: z.enum(["Income", "Expense"]),
  category: z.enum(["Property", "Fleet", "HR", "Other"]),
  date: z.string().min(1, "التاريخ مطلوب"),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

const mockTransactions: Transaction[] = [
  { id: "T1", date: "2024-05-01", description: "إيجار شهري - ساحة الوحدة ٣", amount: 15000, type: "Income", category: "Property" },
  { id: "T2", date: "2024-05-02", description: "مصاريف وقود الأسطول - جملة", amount: 4200, type: "Expense", category: "Fleet" },
  { id: "T3", date: "2024-05-03", description: "صيانة سكن العمال", amount: 1200, type: "Expense", category: "HR" },
  { id: "T4", date: "2024-05-04", description: "أتعاب استشارية - قانونية", amount: 3500, type: "Expense", category: "Other" },
  { id: "T5", date: "2024-05-05", description: "دفعة مقدمة - مشروع جديد", amount: 50000, type: "Income", category: "Other" },
];

export default function FinancePage() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
      type: "Expense",
      category: "Other",
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = (values: TransactionFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsAddDialogOpen(false);
      form.reset();
      toast({
        title: "تم تسجيل العملية",
        description: `تمت إضافة ${values.type === 'Income' ? 'دخل' : 'مصروف'} بقيمة ${formatCurrencyValue(values.amount)} ريال بنجاح.`,
      });
    }, 1000);
  };

  const handleExport = () => {
    toast({
      title: "تصدير البيانات",
      description: "يتم الآن تجهيز التقارير المالية بصيغة Excel...",
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8F9FA]">
        <header className="m3-header">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-medium text-primary">الحسابات والمالية</h1>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-full bg-white border-none h-9 px-4 text-xs font-medium shadow-sm transition-all hover:scale-105"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              تصدير
            </Button>
            <Button 
              size="sm" 
              className="gap-2 rounded-full shadow-sm font-medium h-9 px-5 transition-all hover:scale-105 active:scale-95" 
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              عملية جديدة
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6" dir="rtl">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">الرصيد الإجمالي</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-right">
                <div className="flex items-center gap-1 justify-start">
                  <span className="text-xl font-medium">{formatCurrencyValue(2450000)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-60" />
                </div>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-emerald-600 uppercase tracking-widest">الدخل الشهري</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-emerald-600 text-right">
                <div className="flex items-center gap-1 justify-start">
                  <span className="text-xl font-medium">+{formatCurrencyValue(85200)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 opacity-70" />
                </div>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-rose-600 uppercase tracking-widest">المصروفات</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-rose-600 text-right">
                <div className="flex items-center gap-1 justify-start">
                  <span className="text-xl font-medium">-{formatCurrencyValue(32400)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 opacity-70" />
                </div>
              </CardContent>
            </Card>
            <Card className="m3-card border-none bg-primary text-primary-foreground">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium opacity-80 uppercase tracking-widest">صافي الربح</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-right">
                <div className="flex items-center gap-1 justify-start">
                  <span className="text-xl font-medium">{formatCurrencyValue(52800)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="bg-white/50 backdrop-blur-sm p-1 rounded-full h-11 mb-6 border-none shadow-sm inline-flex">
              <TabsTrigger value="transactions" className="px-8 text-xs font-medium rounded-full data-[state=active]:shadow-sm data-[state=active]:bg-white">العمليات</TabsTrigger>
              <TabsTrigger value="invoices" className="px-8 text-xs font-medium rounded-full data-[state=active]:shadow-sm data-[state=active]:bg-white">الفواتير</TabsTrigger>
              <TabsTrigger value="ledger" className="px-8 text-xs font-medium rounded-full data-[state=active]:shadow-sm data-[state=active]:bg-white">دفتر الأستاذ</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="بحث في العمليات..." className="pr-10 h-10 rounded-full border-none bg-white shadow-sm text-xs" dir="rtl" />
                </div>
                <Button variant="outline" size="sm" className="gap-2 rounded-full bg-white border-none h-10 px-4 text-xs font-medium shadow-sm">
                  <Filter className="h-4 w-4" />
                  تصفية
                </Button>
              </div>

              <div className="m3-table-container">
                <Table>
                  <TableHeader className="m3-table-header">
                    <TableRow className="border-none hover:bg-transparent">
                      <TableHead className="text-right font-medium py-4 px-6">التاريخ</TableHead>
                      <TableHead className="text-right font-medium py-4 px-6">الوصف</TableHead>
                      <TableHead className="text-right font-medium py-4 px-6">الفئة</TableHead>
                      <TableHead className="text-right font-medium py-4 px-6">المبلغ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((tx) => (
                      <TableRow 
                        key={tx.id} 
                        className="m3-table-row cursor-pointer"
                        onClick={() => setSelectedTx(tx)}
                      >
                        <TableCell className="text-right text-[11px] font-mono text-muted-foreground py-4 px-6 text-right">{toArabicDigits(tx.date)}</TableCell>
                        <TableCell className="text-right font-medium text-xs py-4 px-6">{tx.description}</TableCell>
                        <TableCell className="text-right py-4 px-6">
                          <Badge variant="secondary" className="rounded-full font-medium text-[9px] px-3 py-0.5 border-none bg-slate-50 text-slate-600">
                            {tx.category === 'Property' ? 'عقارات' : tx.category === 'Fleet' ? 'أسطول' : tx.category === 'HR' ? 'موارد بشرية' : 'أخرى'}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-right py-4 px-6 ${tx.type === "Income" ? "text-emerald-600" : "text-rose-600"}`}>
                          <div className="flex items-center gap-1 font-medium justify-start text-xs">
                            {tx.type === "Income" ? "+" : "-"} {formatCurrencyValue(tx.amount)}
                            <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-60" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="invoices">
              <Card className="rounded-[28px] border-none shadow-sm py-20 bg-white">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="p-4 bg-slate-50 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground opacity-50" />
                  </div>
                  <h3 className="text-sm font-medium">لا توجد فواتير نشطة</h3>
                  <p className="text-[10px] text-muted-foreground mt-1">لم يتم إصدار أي مطالبات مالية لهذا الشهر.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="rounded-[28px] border-none p-8 max-w-md w-[95%] sm:w-full" dir="rtl">
            <DialogHeader className="text-right mb-6">
              <DialogTitle className="text-lg font-medium text-primary">تسجيل عملية مالية</DialogTitle>
              <DialogDescription className="text-xs">أدخل تفاصيل الإيرادات أو المصروفات لتحديث السجل المالي</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-right">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">وصف العملية</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="مثال: فاتورة صيانة دورية" {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10 text-right" />
                          <FileText className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">المبلغ</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="0" {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10 text-right" />
                            <SaudiRiyalIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">التاريخ</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="date" {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10 text-right" />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">نوع العملية</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11 text-xs text-right">
                              <SelectValue placeholder="اختر النوع" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-xl text-right">
                            <SelectItem value="Income" className="text-xs">دخل (إيداع)</SelectItem>
                            <SelectItem value="Expense" className="text-xs">مصروف (سحب)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">التصنيف</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11 text-xs text-right">
                              <SelectValue placeholder="اختر التصنيف" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-xl text-right">
                            <SelectItem value="Property" className="text-xs">عقارات</SelectItem>
                            <SelectItem value="Fleet" className="text-xs">أسطول</SelectItem>
                            <SelectItem value="HR" className="text-xs">موارد بشرية</SelectItem>
                            <SelectItem value="Other" className="text-xs">تصنيفات أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="pt-8 gap-3 flex-row-reverse sm:justify-start">
                  <Button type="submit" className="rounded-full h-11 flex-1 font-medium" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : "تسجيل العملية"}
                  </Button>
                  <Button type="button" variant="ghost" className="rounded-full h-11 flex-1 font-medium" onClick={() => setIsAddDialogOpen(false)}>
                    إلغاء
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Sheet open={!!selectedTx} onOpenChange={() => setSelectedTx(null)}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">تفاصيل الحركة المالية</SheetTitle>
              <SheetDescription className="text-xs">بيانات القيد المحاسبي والتصنيف</SheetDescription>
            </SheetHeader>
            {selectedTx && (
              <div className="space-y-6 text-right">
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl text-right">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">الوصف</p>
                    <p className="text-sm font-medium">{selectedTx.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl text-right">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">المبلغ</p>
                      <div className="flex items-center gap-1 justify-start flex-row-reverse text-sm font-medium">
                        {formatCurrencyValue(selectedTx.amount)}
                        <SaudiRiyalIcon className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl text-right">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">التاريخ</p>
                      <p className="text-sm font-medium font-mono">{toArabicDigits(selectedTx.date)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl text-right">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">التصنيف</p>
                    <Badge className="rounded-full bg-emerald-50 text-emerald-700 border-none mt-1">
                      {selectedTx.category === 'Property' ? 'عقارات' : selectedTx.category === 'Fleet' ? 'أسطول' : selectedTx.category === 'HR' ? 'موارد بشرية' : 'أخرى'}
                    </Badge>
                  </div>
                </div>
                <Button className="w-full rounded-full h-11" onClick={() => setSelectedTx(null)}>إغلاق</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
