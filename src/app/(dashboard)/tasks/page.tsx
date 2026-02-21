
"use client";

import { useState } from "react";
import { CheckSquare, Plus, Search, MoreVertical, Clock, AlertCircle, CheckCircle2, User, Filter, Loader2, Calendar, Tag } from "lucide-react";
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
import { toArabicDigits } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/erp";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const taskSchema = z.object({
  title: z.string().min(5, "عنوان المهمة يجب أن يكون ٥ أحرف على الأقل"),
  status: z.enum(["Pending", "In Progress", "Completed", "Delayed"]),
  priority: z.enum(["High", "Medium", "Low"]),
  category: z.enum(["CRM", "HR", "Fleet", "Finance", "Property"]),
  dueDate: z.string().min(1, "تاريخ الاستحقاق مطلوب"),
  assigneeName: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

const mockTasks: Task[] = [
  { id: "T1", title: "متابعة عرض شركة الرواد", status: "In Progress", priority: "High", category: "CRM", dueDate: "2024-05-18", assigneeName: "أحمد عبد الله" },
  { id: "T2", title: "تجديد رخص مركبات النقل", status: "Pending", priority: "Medium", category: "Fleet", dueDate: "2024-05-20", assigneeName: "خالد منصور" },
  { id: "T3", title: "مراجعة رواتب شهر مايو", status: "Completed", priority: "High", category: "HR", dueDate: "2024-05-25", assigneeName: "سامي فيصل" },
  { id: "T4", title: "صيانة مجمع السلام", status: "Delayed", priority: "Low", category: "Property", dueDate: "2024-05-15", assigneeName: "سعيد سالم" },
  { id: "T5", title: "تسوية عهده الوقود", status: "In Progress", priority: "Medium", category: "Finance", dueDate: "2024-05-19", assigneeName: "راجيش كومار" },
];

export default function TasksPage() {
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      status: "Pending",
      priority: "Medium",
      category: "CRM",
      dueDate: new Date().toISOString().split('T')[0],
      assigneeName: "",
    },
  });

  const onSubmit = (values: TaskFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Saving task:", values);
      setIsSubmitting(false);
      setIsAddSheetOpen(false);
      form.reset();
      toast({
        title: "تم إنشاء المهمة",
        description: `تم إسناد المهمة إلى الموظف المسؤول بنجاح.`,
      });
    }, 1000);
  };

  const getStatusBadge = (status: Task['status']) => {
    const map = {
      Pending: { label: "قيد الانتظار", color: "bg-slate-50 text-slate-700", icon: Clock },
      "In Progress": { label: "قيد التنفيذ", color: "bg-amber-50 text-amber-700", icon: Loader2 },
      Completed: { label: "مكتملة", color: "bg-emerald-50 text-emerald-700", icon: CheckCircle2 },
      Delayed: { label: "متأخرة", color: "bg-rose-50 text-rose-700", icon: AlertCircle },
    };
    return map[status];
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const map = {
      High: "text-rose-600",
      Medium: "text-amber-600",
      Low: "text-blue-600",
    };
    return map[priority];
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F8F9FA]">
        <header className="m3-header">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-medium text-primary">إدارة المهام والعمليات</h1>
          </div>
          <Button 
            size="sm" 
            className="gap-2 rounded-full shadow-sm font-medium h-9 px-5 transition-all hover:scale-105" 
            onClick={() => setIsAddSheetOpen(true)}
          >
            <Plus className="h-4 w-4" />
            مهمة جديدة
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6" dir="rtl">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">إجمالي المهام</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-right">
                <p className="text-xl font-medium">{toArabicDigits(58)}</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-amber-600 uppercase tracking-widest">قيد التنفيذ</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-amber-600 text-right">
                <p className="text-xl font-medium">{toArabicDigits(12)}</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-emerald-600 uppercase tracking-widest">مكتملة</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-emerald-600 text-right">
                <p className="text-xl font-medium">{toArabicDigits(34)}</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-rose-600 uppercase tracking-widest">متأخرة</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2 text-rose-600 text-right">
                <p className="text-xl font-medium">{toArabicDigits(4)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث في المهام..." className="pr-10 h-10 rounded-full border-none bg-white shadow-sm text-xs" dir="rtl" />
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
                  <TableHead className="text-right font-medium py-4 px-6">المهمة والقسم</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الحالة</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">الأولوية</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">المسؤول</TableHead>
                  <TableHead className="text-right font-medium py-4 px-6">التاريخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTasks.map((task) => {
                  const status = getStatusBadge(task.status);
                  const StatusIcon = status.icon;
                  return (
                    <TableRow 
                      key={task.id} 
                      className="m3-table-row cursor-pointer"
                      onClick={() => setSelectedTask(task)}
                    >
                      <TableCell className="text-right py-4 px-6">
                        <div className="flex flex-col text-right">
                          <span className="font-medium text-xs">{task.title}</span>
                          <span className="text-[9px] text-muted-foreground">
                            {task.category === 'CRM' ? 'المبيعات' : task.category === 'HR' ? 'الموارد البشرية' : task.category === 'Fleet' ? 'الأسطول' : 'أخرى'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4 px-6">
                        <Badge variant="secondary" className={`rounded-full px-3 py-0.5 text-[9px] border-none gap-1.5 flex-row-reverse ${status.color}`}>
                          <StatusIcon className={`h-2.5 w-2.5 ${task.status === 'In Progress' ? 'animate-spin' : ''}`} />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right py-4 px-6 text-[10px] font-bold ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'High' ? 'عالية' : task.priority === 'Medium' ? 'متوسطة' : 'منخفضة'}
                      </TableCell>
                      <TableCell className="text-right py-4 px-6">
                        <div className="flex items-center gap-1.5 text-xs justify-start flex-row-reverse">
                          <User className="h-3.5 w-3.5 text-muted-foreground opacity-50" />
                          <span className="text-[11px] font-medium">{task.assigneeName || "غير معين"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-[11px] text-muted-foreground font-mono py-4 px-6">
                        {toArabicDigits(task.dueDate)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* نافذة إضافة مهمة جديدة - تم تحويلها إلى Dialog Popup */}
        <Dialog open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <DialogContent className="rounded-[28px] border-none p-8 max-w-md w-[95%] sm:w-full" dir="rtl">
            <DialogHeader className="text-right mb-6">
              <DialogTitle className="text-lg font-medium text-primary">إنشاء مهمة عمل</DialogTitle>
              <DialogDescription className="text-xs">حدد تفاصيل المهمة والمسؤول عن تنفيذها</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-right">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">وصف المهمة الرئيسي</FormLabel>
                      <FormControl>
                        <Input placeholder="ما الذي يجب القيام به؟" {...field} className="rounded-xl bg-slate-50 border-none h-11 text-right" />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">القسم / الفئة</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11 text-xs text-right">
                              <SelectValue placeholder="اختر الفئة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-xl text-right">
                            <SelectItem value="CRM" className="text-xs">المبيعات والعملاء</SelectItem>
                            <SelectItem value="HR" className="text-xs">الموارد البشرية</SelectItem>
                            <SelectItem value="Fleet" className="text-xs">إدارة الأسطول</SelectItem>
                            <SelectItem value="Finance" className="text-xs">المالية والحسابات</SelectItem>
                            <SelectItem value="Property" className="text-xs">إدارة العقارات</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">الأولوية</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11 text-xs text-right">
                              <SelectValue placeholder="اختر الأولوية" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-none shadow-xl text-right">
                            <SelectItem value="High" className="text-xs text-rose-600 font-medium">عالية جداً</SelectItem>
                            <SelectItem value="Medium" className="text-xs text-amber-600 font-medium">متوسطة</SelectItem>
                            <SelectItem value="Low" className="text-xs text-blue-600 font-medium">منخفضة</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">تاريخ الاستحقاق</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="assigneeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium">إسناد إلى موظف</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="اسم الموظف..." {...field} className="rounded-xl bg-slate-50 border-none h-11 pr-10 text-right" />
                            <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter className="pt-8 gap-3 flex-row-reverse sm:justify-start">
                  <Button type="submit" className="rounded-full h-11 flex-1 font-medium" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : "إسناد المهمة"}
                  </Button>
                  <Button type="button" variant="ghost" className="rounded-full h-11 flex-1 font-medium" onClick={() => setIsAddSheetOpen(false)}>
                    إلغاء
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* نافذة عرض تفاصيل المهمة */}
        <Sheet open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <SheetContent side="right" className="rounded-l-3xl border-none p-8" dir="rtl">
            <SheetHeader className="text-right mb-8">
              <SheetTitle className="text-lg font-medium text-primary">تفاصيل المهمة</SheetTitle>
              <SheetDescription className="text-xs">بيانات العمل والمسؤول عن التنفيذ</SheetDescription>
            </SheetHeader>
            {selectedTask && (
              <div className="space-y-6 text-right">
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl text-right">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">عنوان المهمة</p>
                    <p className="text-sm font-medium">{selectedTask.title}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl text-right">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">الحالة</p>
                      <Badge className={`text-[10px] border-none ${getStatusBadge(selectedTask.status).color}`}>
                        {getStatusBadge(selectedTask.status).label}
                      </Badge>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl text-right">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">الأولوية</p>
                      <p className={`text-sm font-medium ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority === 'High' ? 'عالية' : selectedTask.priority === 'Medium' ? 'متوسطة' : 'منخفضة'}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl text-right">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">المسؤول</p>
                    <div className="flex items-center gap-2 justify-start flex-row-reverse">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{selectedTask.assigneeName || "غير معين"}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full rounded-full h-11" onClick={() => setSelectedTask(null)}>إغلاق</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
