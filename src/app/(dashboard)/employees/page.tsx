"use client";

import { Users, Plus, Search, MoreVertical, Edit, Trash2, Eye, UserCheck, ShieldAlert } from "lucide-react";
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
import { Employee } from "@/types/erp";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const mockEmployees: Employee[] = [
  { id: "1", name: "أحمد عبد الله", role: "مدير", iqamaNumber: "2340001234", salary: 15000, department: "Admin", status: "Active", housingId: "H1" },
  { id: "2", name: "خالد منصور", role: "مشرف", iqamaNumber: "2340005678", salary: 8500, department: "Field", status: "Active", housingId: "H1" },
  { id: "3", name: "راجيش كومار", role: "سائق", iqamaNumber: "2340009012", salary: 4500, department: "Fleet", status: "Active", housingId: "H2" },
  { id: "4", name: "سامي فيصل", role: "محاسب", iqamaNumber: "2340003456", salary: 12000, department: "Accounts", status: "Active" },
  { id: "5", name: "لي وانغ", role: "عامل", iqamaNumber: "2340007890", salary: 3500, department: "Field", status: "On Leave", housingId: "H2" },
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
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-xl font-bold text-primary">الموارد البشرية</h1>
          </div>
          <Button className="gap-2 rounded-xl shadow-lg shadow-primary/20" onClick={() => handleAction("إضافة", "جديد")}>
            <Plus className="h-4 w-4" />
            إضافة موظف
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث بالاسم، الهوية أو المسمى..." className="pr-9 rounded-xl border-slate-200 text-right" dir="rtl" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1 rounded-lg">نشط: {toArabicDigits(128)}</Badge>
              <Badge variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-700 border-none rounded-lg">في إجازة: {toArabicDigits(14)}</Badge>
            </div>
          </div>

          <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[300px] text-right font-bold">الموظف</TableHead>
                  <TableHead className="text-right font-bold">الإقامة / الهوية</TableHead>
                  <TableHead className="text-right font-bold">القسم</TableHead>
                  <TableHead className="text-right font-bold">المسمى الوظيفي</TableHead>
                  <TableHead className="text-right font-bold">الحالة</TableHead>
                  <TableHead className="text-right font-bold">السكن</TableHead>
                  <TableHead className="text-right font-bold">الراتب</TableHead>
                  <TableHead className="w-[80px] text-center font-bold">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEmployees.map((emp) => (
                  <TableRow key={emp.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="text-right">
                      <div className="flex items-center gap-3 justify-end">
                        <div className="flex flex-col text-right">
                          <span className="font-bold text-sm">{emp.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">emp_{emp.id.padStart(3, '0')}@alsalam.sa</span>
                        </div>
                        <Avatar className="h-9 w-9 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">{toArabicDigits(emp.iqamaNumber)}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-normal rounded-lg">
                        {emp.department === 'Admin' ? 'الإدارة' : emp.department === 'Field' ? 'الميدان' : emp.department === 'Fleet' ? 'الأسطول' : 'الحسابات'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium">{emp.role}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={emp.status === "Active" ? "default" : "secondary"}
                        className={`rounded-lg ${emp.status === "Active" ? "bg-emerald-500 hover:bg-emerald-600 border-none" : ""}`}
                      >
                        {emp.status === 'Active' ? 'نشط' : 'في إجازة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {emp.housingId ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold justify-end">
                          <span>مخصص له</span>
                          <Users className="h-3 w-3" />
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">سكن خاص</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 font-mono font-black justify-end">
                        {formatCurrencyValue(emp.salary)}
                        <SaudiRiyalIcon className="h-4 w-4 opacity-70" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 font-headline">
                          <DropdownMenuItem className="flex justify-end gap-2 text-right" onClick={() => handleAction("عرض ملف", emp.name)}>
                            <span>ملف الموظف</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2 text-right" onClick={() => handleAction("تعديل بيانات", emp.name)}>
                            <span>تعديل البيانات</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2 text-right" onClick={() => handleAction("تغيير حالة", emp.name)}>
                            <span>تغيير الحالة</span>
                            <UserCheck className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-amber-600" onClick={() => handleAction("تعليق", emp.name)}>
                            <span>تعليق العمل</span>
                            <ShieldAlert className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-rose-600 focus:text-rose-600 focus:bg-rose-50" onClick={() => handleAction("إنهاء خدمات", emp.name)}>
                            <span>إنهاء الخدمات</span>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
