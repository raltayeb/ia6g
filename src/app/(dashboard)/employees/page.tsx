
import { Users, Plus, Search, MoreVertical, Mail, Phone, MapPin, Home } from "lucide-react";
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
import { Employee } from "@/types/erp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockEmployees: Employee[] = [
  { id: "1", name: "أحمد عبد الله", role: "مدير", iqamaNumber: "2340001234", salary: 15000, department: "Admin", status: "Active", housingId: "H1" },
  { id: "2", name: "خالد منصور", role: "مشرف", iqamaNumber: "2340005678", salary: 8500, department: "Field", status: "Active", housingId: "H1" },
  { id: "3", name: "راجيش كومار", role: "سائق", iqamaNumber: "2340009012", salary: 4500, department: "Fleet", status: "Active", housingId: "H2" },
  { id: "4", name: "سامي فيصل", role: "محاسب", iqamaNumber: "2340003456", salary: 12000, department: "Accounts", status: "Active" },
  { id: "5", name: "لي وانغ", role: "عامل", iqamaNumber: "2340007890", salary: 3500, department: "Field", status: "On Leave", housingId: "H2" },
];

export default function EmployeesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-mr-1" />
            <h1 className="font-headline text-xl font-bold text-primary">الموارد البشرية</h1>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة موظف
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث بالاسم، الهوية أو المسمى..." className="pr-9" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1">نشط: 128</Badge>
              <Badge variant="secondary" className="px-3 py-1 bg-blue-100 text-blue-800 border-none">في إجازة: 14</Badge>
            </div>
          </div>

          <div className="rounded-xl border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px] text-right">الموظف</TableHead>
                  <TableHead className="text-right">الإقامة / الهوية</TableHead>
                  <TableHead className="text-right">القسم</TableHead>
                  <TableHead className="text-right">المسمى الوظيفي</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">السكن</TableHead>
                  <TableHead className="text-left">الراتب</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEmployees.map((emp) => (
                  <TableRow key={emp.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{emp.name}</span>
                          <span className="text-xs text-muted-foreground">emp_{emp.id.padStart(3, '0')}@alsalam.sa</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{emp.iqamaNumber}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {emp.department === 'Admin' ? 'الإدارة' : emp.department === 'Field' ? 'الميدان' : emp.department === 'Fleet' ? 'الأسطول' : 'الحسابات'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{emp.role}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={emp.status === "Active" ? "default" : "secondary"}
                        className={emp.status === "Active" ? "bg-emerald-500 hover:bg-emerald-600 border-none" : ""}
                      >
                        {emp.status === 'Active' ? 'نشط' : 'في إجازة'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {emp.housingId ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                          <Home className="h-3 w-3" />
                          مخصص له
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">سكن خاص</span>
                      )}
                    </TableCell>
                    <TableCell className="text-left font-mono text-sm">
                      {emp.salary.toLocaleString()} ر.س
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
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
