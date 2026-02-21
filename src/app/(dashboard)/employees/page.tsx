"use client";

import { useState } from "react";
import { Users, Plus, Search, MoreVertical, Edit, Trash2, Eye, UserCheck, Wallet } from "lucide-react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const mockEmployees: Employee[] = [
  { id: "1", name: "أحمد عبد الله", role: "مدير", iqamaNumber: "2340001234", salary: 15000, department: "Admin", status: "Active" },
  { id: "2", name: "خالد منصور", role: "مشرف", iqamaNumber: "2340005678", salary: 8500, department: "Field", status: "Active" },
  { id: "3", name: "راجيش كومار", role: "سائق", iqamaNumber: "2340009012", salary: 4500, department: "Fleet", status: "Active" },
  { id: "4", name: "سامي فيصل", role: "محاسب", iqamaNumber: "2340003456", salary: 12000, department: "Accounts", status: "Active" },
  { id: "5", name: "لي وانغ", role: "عامل", iqamaNumber: "2340007890", salary: 3500, department: "Field", status: "On Leave" },
];

export default function EmployeesPage() {
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleAction = (action: string, name: string) => {
    toast({
      title: "إجراء إداري",
      description: `تم طلب ${action} للموظف ${name}`,
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="m3-header">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-medium text-primary">الموارد البشرية</h1>
          </div>
          <Button size="sm" className="gap-2 rounded-full shadow-sm font-medium h-9 px-5" onClick={() => handleAction("إضافة", "جديد")}>
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
              <CardContent className="p-0 pt-2">
                <p className="text-xl font-medium text-right">{toArabicDigits(142)}</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">الموظفين النشطين</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <p className="text-xl font-medium text-right text-emerald-600">{toArabicDigits(128)}</p>
              </CardContent>
            </Card>
            <Card className="m3-card border-none">
              <CardHeader className="pb-2 text-right p-0">
                <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">الرواتب الشهرية</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <div className="flex items-center gap-1 justify-start flex-row-reverse">
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
                  <TableHead className="text-right font-medium py-4 px-6">الإقامة / الهوية</TableHead>
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
                      <div className="flex items-center gap-3 justify-start flex-row-reverse">
                        <div className="flex flex-col text-right">
                          <span className="font-medium text-xs">{emp.name}</span>
                          <span className="text-[9px] text-muted-foreground font-mono">#{emp.id.padStart(3, '0')}</span>
                        </div>
                        <Avatar className="h-8 w-8 rounded-xl border-none bg-emerald-50 shrink-0">
                          <AvatarFallback className="text-emerald-700 text-[10px] font-medium">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-[11px] font-medium py-4 px-6">{toArabicDigits(emp.iqamaNumber)}</TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <div className="flex flex-col">
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
                      <div className="flex items-center gap-1 font-medium justify-start flex-row-reverse text-xs">
                        {formatCurrencyValue(emp.salary)}
                        <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-60" />
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-2xl border-none shadow-lg">
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs" onClick={() => setSelectedEmployee(emp)}>
                            <span>ملف الموظف</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs" onClick={() => handleAction("تعديل", emp.name)}>
                            <span>تعديل البيانات</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs text-rose-600" onClick={() => handleAction("إنهاء", emp.name)}>
                            <span>إنهاء خدمات</span>
                            <Trash2 className="h-4 w-4" />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
              <SheetTitle className="text-lg font-medium text-primary">ملف الموظف</SheetTitle>
              <SheetDescription className="text-xs">بيانات الهوية والرواتب</SheetDescription>
            </SheetHeader>
            {selectedEmployee && (
              <div className="space-y-6 text-right">
                <div className="flex items-center gap-4 flex-row-reverse">
                  <Avatar className="h-16 w-16 rounded-3xl bg-emerald-50 shrink-0">
                    <AvatarFallback className="text-emerald-700 text-lg font-medium">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{selectedEmployee.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedEmployee.role}</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">رقم الإقامة / الهوية</p>
                    <p className="text-sm font-medium font-mono">{toArabicDigits(selectedEmployee.iqamaNumber)}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">القسم</p>
                    <p className="text-sm font-medium">{selectedEmployee.department}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">الراتب الأساسي</p>
                    <div className="flex items-center gap-1 justify-start flex-row-reverse text-sm font-medium">
                      {formatCurrencyValue(selectedEmployee.salary)}
                      <SaudiRiyalIcon className="h-3 w-3" />
                    </div>
                  </div>
                </div>
                <Button className="w-full rounded-full h-11" onClick={() => setSelectedEmployee(null)}>إغلاق</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
