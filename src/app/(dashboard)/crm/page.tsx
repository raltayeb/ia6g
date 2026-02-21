
"use client";

import { useState } from "react";
import { Briefcase, Plus, Search, MoreVertical, TrendingUp, Phone, User, ExternalLink, Filter, Loader2 } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Lead } from "@/types/erp";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const leadSchema = z.object({
  companyName: z.string().min(2, "اسم الشركة مطلوب"),
  contactPerson: z.string().min(2, "اسم الشخص المسؤول مطلوب"),
  status: z.enum(["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]),
  value: z.coerce.number().min(0, "القيمة المتوقعة يجب أن تكون موجبة"),
  source: z.string().min(2, "مصدر العميل مطلوب"),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const mockLeads: Lead[] = [
  { id: "L1", companyName: "شركة الرواد للتطوير", contactPerson: "سليمان القحطاني", status: "Proposal", value: 125000, source: "موقع إلكتروني", lastContact: "2024-05-10" },
  { id: "L2", companyName: "مجموعة المجد الاستثمارية", contactPerson: "فاطمة أحمد", status: "Qualified", value: 450000, source: "إحالة", lastContact: "2024-05-12" },
  { id: "L3", companyName: "مؤسسة النجاح للمقاولات", contactPerson: "محمد العتيبي", status: "Won", value: 85000, source: "إعلان سنب شات", lastContact: "2024-05-08" },
  { id: "L4", companyName: "شركة الحلول الذكية", contactPerson: "جون دو", status: "Contacted", value: 30000, source: "اتصال مباشر", lastContact: "2024-05-14" },
  { id: "L5", companyName: "الأفق العالمي للشحن", contactPerson: "علي الزهراني", status: "New", value: 200000, source: "معرض الرياض", lastContact: "2024-05-15" },
];

export default function CRMPage() {
  const { toast } = useToast();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      status: "New",
      value: 0,
      source: "",
    },
  });

  const onSubmit = (values: LeadFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Saving lead:", values);
      setIsSubmitting(false);
      setIsAddSheetOpen(false);
      form.reset();
      toast({
        title: "تمت إضافة العميل المحتمل",
        description: `تم تسجيل "${values.companyName}" في قاعدة بيانات CRM بنجاح.`,
      });
    }, 1000);
  };

  const getStatusBadge = (status: Lead['status']) => {
    const map = {
      New: { label: "جديد", color: "bg-blue-50 text-blue-700" },
      Contacted: { label: "تم التواصل", color: "bg-amber-50 text-amber-700" },
      Qualified: { label: "مؤهل", color: "bg-indigo-50 text-indigo-700" },
      Proposal: { label: "تقديم عرض", color: "bg-purple-50 text-purple-700" },
      Won: { label: "تم التعاقد", color: "bg-emerald-50 text-emerald-700" },
      Lost: { label: "ملغي", color: "bg-rose-50 text-rose-700" },
    };
    return map[status];
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8F9FA]">
        <header className="m3-header">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-medium text-primary">إدارة علاقات العملاء (CRM)</h1>
          </div>
          <Button 
            size="sm" 
            className="gap-2 rounded-full shadow-sm font-medium h-9 px-5 transition-all hover:scale-105" 
            onClick={() => setIsAddSheetOpen(true)}
          >
            <Plus className="h-4 w-4" />
            عميل محتمل جديد
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6" dir="rtl">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">إجمالي العملاء</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <p className="text-xl font-medium text-right">{toArabicDigits(142)}</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-emerald-600 uppercase tracking-widest">المبيعات المتوقعة</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-emerald-600">
                <div className="flex items-center gap-1 justify-start flex-row-reverse">
                  <span className="text-xl font-medium">{formatCurrencyValue(890000)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 opacity-70" />
                </div>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-blue-600 uppercase tracking-widest">نسبة التحويل</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-blue-600">
                <p className="text-xl font-medium text-right">{toArabicDigits(24)}%</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث عن الشركات أو المسؤولين..." className="pr-10 h-10 rounded-full border-none bg-white shadow-sm text-xs" dir="rtl" />
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
                  <TableHead className="text-right font-medium py-4 px-6">الشركة والمسؤول</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الحالة</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">القيمة المتوقعة</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">آخر تواصل</TableHead>
                  <TableHead className="w-[50px] py-4 px-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLeads.map((lead) => (
                  <TableRow 
                    key={lead.id} 
                    className="m3-table-row cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-xs">{lead.companyName}</span>
                        <span className="text-[9px] text-muted-foreground flex items-center gap-1 flex-row-reverse">
                          <User className="h-2.5 w-2.5" />
                          {lead.contactPerson}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <Badge variant="secondary" className={`rounded-full px-3 py-0.5 text-[9px] border-none ${getStatusBadge(lead.status).color}`}>
                        {getStatusBadge(lead.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex items-center gap-1 font-medium justify-start flex-row-reverse text-xs">
                        {formatCurrencyValue(lead.value)}
                        <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-60" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-[11px] text-muted-foreground font-mono py-4 px-6">
                      {toArabicDigits(lead.lastContact)}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* نافذة إضافة عميل جديد */}
        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">إضافة فرصة بيعية جديدة</SheetTitle>
              <SheetDescription className="text-xs">سجل بيانات العميل المحتمل لبدء رحلة المبيعات</SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-right">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">اسم المنشأة / الشركة</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: شركة التطوير العقاري" {...field} className="rounded-xl bg-slate-50 border-none h-11" />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">الشخص المسؤول / جهة الاتصال</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="مثال: م. أحمد علي" {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10" />
                          <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">القيمة المتوقعة</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="0" {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10" />
                            <SaudiRiyalIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">مرحلة البيع</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11 text-xs">
                              <SelectValue placeholder="اختر المرحلة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-xl">
                            <SelectItem value="New" className="text-xs">جديد</SelectItem>
                            <SelectItem value="Contacted" className="text-xs">تم التواصل</SelectItem>
                            <SelectItem value="Qualified" className="text-xs">مؤهل</SelectItem>
                            <SelectItem value="Proposal" className="text-xs">تقديم عرض</SelectItem>
                            <SelectItem value="Won" className="text-xs">تم التعاقد</SelectItem>
                            <SelectItem value="Lost" className="text-xs">ملغي</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">مصدر العميل</FormLabel>
                      <FormControl>
                        <Input placeholder="مثال: منصة لينكدان، إعلان سناب، إحالة..." {...field} className="rounded-xl bg-slate-50 border-none h-11" />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <SheetFooter className="pt-8 gap-3 flex-row-reverse sm:justify-start">
                  <Button type="submit" className="rounded-full h-11 flex-1 font-medium" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : "حفظ الفرصة"}
                  </Button>
                  <Button type="button" variant="ghost" className="rounded-full h-11 flex-1 font-medium" onClick={() => setIsAddSheetOpen(false)}>
                    إلغاء
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
