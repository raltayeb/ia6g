
"use client";

import { useState } from "react";
import { Users, Plus, Search, MoreVertical, Edit, Trash2, Eye, Loader2, Filter, User, CreditCard, Briefcase, Wallet, CheckCircle2, Clock } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Employee } from "@/types/erp";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const employeeSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون ٣ أحرف على الأقل"),
  role: z.string().min(2, "المنصب مطلوب"),
  iqamaNumber: z.string().length(10, "رقم الإقامة/الهوية يجب أن يتكون من ١٠ أرقام"),
  salary: z.coerce.number().min(1000, "الراتب يجب أن يكون ١٠٠٠ ريال على الأقل"),
  department: z.enum(["Admin", "Field", "Fleet", "Accounts"]),
  status: z.enum(["Active", "On Leave", "Terminated"]),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const mockEmployees: Employee[] = [
  { id: "1", name: "أحمد عبد الله", role: "مدير المبيعات", iqamaNumber: "2340001234", salary: 15000, department: "Admin", status: "Active" },
  { id: "2", name: "خالد منصور", role: "مشرف العمليات", iqamaNumber: "2340005678", salary: 8500, department: "Field", status: "Active" },
  { id: "3", name: "راجيش كومار", role: "سائق أسطول", iqamaNumber: "2340009012", salary: 4500, department: "Fleet", status: "Active" },
  { id: "4", name: "سامي فيصل", role: "محاسب أول", iqamaNumber: "2340003456", salary: 12000, department: "Accounts", status: "Active" },
  { id: "5", name: "لي وانغ", role: "فني صيانة", iqamaNumber: "2340007890", salary: 3500, department: "Field", status: "On Leave" },
];

const mockEmployeeTasks = [
  { id: "T1", title: "متابعة عرض شركة الرواد", status: "In Progress" },
  { id: "T2", title: "مراجعة تقرير المبيعات", status: "Completed" },
];

export default function EmployeesPage() {
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      role: "",
      iqamaNumber: "",
      salary: 0,
      department: "Field",
      status: "Active",
    },
  });

  const onSubmit = (values: EmployeeFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsAddSheetOpen(false);
      form.reset();
      toast({
        title: "تمت إضافة الموظف",
        description: `تم تسجيل الموظف "${values.name}" في النظام بنجاح.`,
      });
    }, 1000);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8F9FA]">
        <header className="m3-header">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-medium text-primary">إدارة الموارد البشرية المتكاملة</h1>
          </div>
          <Button 
            size="sm" 
            className="gap-2 rounded-full shadow-sm font-medium h-9 px-5 transition-all hover:scale-105 active:scale-95" 
            onClick={() => setIsAddSheetOpen(true)}
          >
            <Plus className="h-4 w-4" />
            إضافة موظف
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6" dir="rtl">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">إجمالي الموظفين</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-right">
                <p className="text-xl font-medium">{toArabicDigits(142)}</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">نسبة المهام المنجزة</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-right text-emerald-600">
                <p className="text-xl font-medium">{toArabicDigits(85)}%</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">إجمالي الرواتب</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-right">
                <div className="flex items-center gap-1 justify-start">
                  <span className="text-xl font-medium">{formatCurrencyValue(845000)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث بالاسم أو الهوية..." className="pr-10 h-10 rounded-full border-none bg-white shadow-sm text-xs" dir="rtl" />
            </div>
          </div>

          <div className="m3-table-container">
            <Table>
              <TableHeader className="m3-table-header">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-right font-medium py-4 px-6">الموظف</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الهوية / الإقامة</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">المنصب</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الحالة</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الراتب</TableHead>
                  <TableHead className="w-[50px] py-4 px-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEmployees.map((emp) => (
                  <TableRow 
                    key={emp.id} 
                    className="m3-table-row cursor-pointer"
                    onClick={() => setSelectedEmployee(emp)}
                  >
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex items-center gap-3 justify-start">
                        <Avatar className="h-8 w-8 rounded-xl border-none bg-emerald-50 shrink-0">
                          <AvatarFallback className="text-emerald-700 text-[10px] font-medium">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-right">
                          <span className="font-medium text-xs">{emp.name}</span>
                          <span className="text-[9px] text-muted-foreground font-mono">#{emp.id.padStart(3, '0')}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-[11px] font-medium py-4 px-6">{toArabicDigits(emp.iqamaNumber)}</TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex flex-col text-right">
                        <span className="text-xs font-medium">{emp.role}</span>
                        <span className="text-[9px] text-muted-foreground">
                          {emp.department === 'Admin' ? 'الإدارة' : emp.department === 'Field' ? 'الميدان' : emp.department === 'Fleet' ? 'الأسطول' : 'الحسابات'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <Badge 
                        variant="secondary"
                        className={`rounded-full px-3 py-0.5 text-[9px] font-medium border-none ${emp.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-600"}`}
                      >
                        {emp.status === 'Active' ? 'نشط' : 'إجازة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex items-center gap-1 font-medium justify-start text-xs">
                        {formatCurrencyValue(emp.salary)}
                        <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-60" />
                      </div>
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

        <Sheet open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">ملف الموظف والمهام</SheetTitle>
              <SheetDescription className="text-xs">السجل الوظيفي والعمليات المكلف بها حالياً</SheetDescription>
            </SheetHeader>
            {selectedEmployee && (
              <div className="space-y-6 text-right">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-3xl bg-emerald-50 shrink-0">
                    <AvatarFallback className="text-emerald-700 text-lg font-medium">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-right">
                    <p className="text-sm font-medium">{selectedEmployee.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedEmployee.role}</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-right">
                   <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest border-b pb-2">المهام المسندة حالياً</h3>
                   {mockEmployeeTasks.map(task => (
                     <div key={task.id} className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                       <Badge className={`text-[8px] border-none rounded-lg ${task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                         {task.status === 'Completed' ? 'مكتمل' : 'جاري'}
                       </Badge>
                       <div className="flex items-center gap-2">
                         <span className="text-[11px] font-medium">{task.title}</span>
                         {task.status === 'Completed' ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Clock className="h-4 w-4 text-amber-500 animate-pulse" />}
                       </div>
                     </div>
                   ))}
                </div>

                <div className="grid gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl text-right">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">الراتب الأساسي</p>
                    <div className="flex items-center gap-1 justify-start font-medium text-sm">
                      {formatCurrencyValue(selectedEmployee.salary)}
                      <SaudiRiyalIcon className="h-3 w-3 opacity-60" />
                    </div>
                  </div>
                </div>
                <Button className="w-full rounded-full h-11" onClick={() => setSelectedEmployee(null)}>إغلاق الملف</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>

        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">إضافة موظف جديد</SheetTitle>
              <SheetDescription className="text-xs">أدخل البيانات الأساسية لتسجيل الموظف في النظام</SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-right">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input placeholder="الاسم كما هو في الهوية" {...field} className="rounded-xl bg-slate-50 border-none h-11 text-right" />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="iqamaNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">رقم الإقامة / الهوية</FormLabel>
                        <FormControl>
                          <Input placeholder="2XXXXXXXXX" {...field} className="rounded-xl bg-slate-50 border-none h-11 font-mono text-right" />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">القسم</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11 text-xs text-right">
                              <SelectValue placeholder="اختر القسم" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-xl text-right">
                            <SelectItem value="Admin" className="text-xs">الإدارة</SelectItem>
                            <SelectItem value="Field" className="text-xs">الميدان</SelectItem>
                            <SelectItem value="Fleet" className="text-xs">الأسطول</SelectItem>
                            <SelectItem value="Accounts" className="text-xs">الحسابات</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>
                <SheetFooter className="pt-8 gap-3 flex-row-reverse sm:justify-start">
                  <Button type="submit" className="rounded-full h-11 flex-1" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "حفظ الموظف"}
                  </Button>
                  <Button type="button" variant="ghost" className="rounded-full h-11 flex-1" onClick={() => setIsAddSheetOpen(false)}>
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
