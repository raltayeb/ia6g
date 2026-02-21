"use client";

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

const mockEmployees: Employee[] = [
  { id: "1", name: "أحمد عبد الله", role: "مدير", iqamaNumber: "2340001234", salary: 15000, department: "Admin", status: "Active" },
  { id: "2", name: "خالد منصور", role: "مشرف", iqamaNumber: "2340005678", salary: 8500, department: "Field", status: "Active" },
  { id: "3", name: "راجيش كومار", role: "سائق", iqamaNumber: "2340009012", salary: 4500, department: "Fleet", status: "Active" },
  { id: "4", name: "سامي فيصل", role: "محاسب", iqamaNumber: "2340003456", salary: 12000, department: "Accounts", status: "Active" },
  { id: "5", name: "لي وانغ", role: "عامل", iqamaNumber: "2340007890", salary: 3500, department: "Field", status: "On Leave" },
];

export default function EmployeesPage() {
  const { toast } = useToast();

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
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-black text-primary">الموارد البشرية</h1>
          </div>
          <Button size="sm" className="gap-2 rounded-xl shadow-sm font-bold h-9" onClick={() => handleAction("إضافة", "جديد")}>
            <Plus className="h-4 w-4" />
            إضافة موظف
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">إجمالي الموظفين</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-black text-right">{toArabicDigits(142)}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">الموظفين النشطين</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-black text-right text-emerald-600">{toArabicDigits(128)}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">الرواتب الشهرية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xl font-black">{formatCurrencyValue(845000)}</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث بالاسم أو الهوية..." className="pr-10 h-10 rounded-2xl border-none bg-white/80 text-xs" dir="rtl" />
            </div>
          </div>

          <Card className="rounded-3xl border-none bg-white/80 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الموظف</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الإقامة / الهوية</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">المنصب</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الحالة</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الراتب</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEmployees.map((emp) => (
                  <TableRow key={emp.id} className="hover:bg-muted/30 transition-colors border-b border-slate-100/50 last:border-0">
                    <TableCell className="text-right">
                      <div className="flex items-center gap-3 justify-end">
                        <div className="flex flex-col text-right">
                          <span className="font-bold text-xs">{emp.name}</span>
                          <span className="text-[9px] text-muted-foreground font-mono">#{emp.id.padStart(3, '0')}</span>
                        </div>
                        <Avatar className="h-8 w-8 rounded-xl border-none bg-emerald-50 shrink-0">
                          <AvatarFallback className="text-emerald-700 text-[10px] font-bold">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-[11px] font-medium">{toArabicDigits(emp.iqamaNumber)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{emp.role}</span>
                        <span className="text-[9px] text-muted-foreground">
                          {emp.department === 'Admin' ? 'الإدارة' : emp.department === 'Field' ? 'الميدان' : emp.department === 'Fleet' ? 'الأسطول' : 'الحسابات'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant="secondary"
                        className={`rounded-lg px-3 py-0.5 text-[9px] font-bold border-none ${emp.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        {emp.status === 'Active' ? 'نشط' : 'إجازة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 font-black justify-end text-xs">
                        {formatCurrencyValue(emp.salary)}
                        <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-60" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-2xl">
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-xs" onClick={() => handleAction("عرض ملف", emp.name)}>
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
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
