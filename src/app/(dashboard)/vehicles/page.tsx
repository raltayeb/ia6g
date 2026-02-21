"use client";

import { Car, Plus, Search, MoreVertical, Fuel, Wrench, User, Edit, Trash2, Eye, History } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vehicle } from "@/types/erp";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const mockVehicles: Vehicle[] = [
  { id: "1", plateNumber: "أ ب ج 1234", model: "تويوتا هايلكس 2023", type: "Truck", driverName: "أحمد علي", lastServiceDate: "2024-03-10", status: "Active", purchaseValue: 120000 },
  { id: "2", plateNumber: "د هـ و 5678", model: "هيونداي إلنترا 2022", type: "Sedan", driverName: "محمد خالد", lastServiceDate: "2024-02-15", status: "Maintenance", purchaseValue: 75000 },
  { id: "3", plateNumber: "ز ح ط 9012", model: "مرسيدس أكتروس", type: "Truck", driverName: "سعيد سالم", lastServiceDate: "2024-04-01", status: "Active", purchaseValue: 450000 },
  { id: "4", plateNumber: "ي ك ل 3456", model: "تويوتا هايس", type: "Van", driverName: "يوسف إبراهيم", lastServiceDate: "2023-12-20", status: "Out of Service", purchaseValue: 110000 },
  { id: "5", plateNumber: "م ن و 7890", model: "فورد F-150", type: "Truck", driverName: "فيصل أحمد", lastServiceDate: "2024-03-25", status: "Active", purchaseValue: 180000 },
];

export default function VehiclesPage() {
  const { toast } = useToast();

  const handleAction = (action: string, plate: string) => {
    toast({
      title: "إدارة الأسطول",
      description: `تم تنفيذ إجراء ${action} للمركبة ${plate}`,
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-muted/30">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-background sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-lg font-bold">إدارة الأسطول</h1>
          </div>
          <Button size="sm" className="gap-2" onClick={() => handleAction("تسجيل", "جديدة")}>
            <Plus className="h-4 w-4" />
            تسجيل مركبة
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Car className="h-4 w-4 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">إجمالي الوحدات</p>
                  <p className="text-xl font-bold">{toArabicDigits(58)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="p-2 bg-blue-500/10 rounded-md">
                  <User className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">السائقين النشطين</p>
                  <p className="text-xl font-bold">{toArabicDigits(42)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="p-2 bg-amber-500/10 rounded-md">
                  <Wrench className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">في الصيانة</p>
                  <p className="text-xl font-bold">{toArabicDigits(6)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="p-2 bg-slate-500/10 rounded-md">
                  <Fuel className="h-4 w-4 text-slate-500" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">تكاليف الوقود</p>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-xl font-bold">{toArabicDigits(12.4)}ألف</span>
                    <SaudiRiyalIcon className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث برقم اللوحة أو الموديل..." className="pr-9 text-right" dir="rtl" />
            </div>
          </div>

          <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right font-bold">رقم اللوحة</TableHead>
                  <TableHead className="text-right font-bold">الموديل والنوع</TableHead>
                  <TableHead className="text-right font-bold">السائق</TableHead>
                  <TableHead className="text-right font-bold">الحالة</TableHead>
                  <TableHead className="text-right font-bold">آخر صيانة</TableHead>
                  <TableHead className="text-right font-bold">التقييم</TableHead>
                  <TableHead className="w-[80px] text-center font-bold">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="text-right font-bold text-primary">{toArabicDigits(vehicle.plateNumber)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col text-right">
                        <span className="font-medium text-sm">{vehicle.model}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">
                          {vehicle.type === 'Truck' ? 'شاحنة' : vehicle.type === 'Sedan' ? 'سيدان' : vehicle.type === 'Van' ? 'فان' : 'حافلة'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm">{vehicle.driverName || "غير محدد"}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={vehicle.status === "Active" ? "default" : vehicle.status === "Maintenance" ? "secondary" : "destructive"}>
                        {vehicle.status === 'Active' ? 'نشط' : vehicle.status === 'Maintenance' ? 'صيانة' : 'خارج الخدمة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">{toArabicDigits(vehicle.lastServiceDate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 font-bold justify-end text-sm">
                        {formatCurrencyValue(vehicle.purchaseValue)}
                        <SaudiRiyalIcon className="h-4 w-4" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="flex justify-end gap-2" onClick={() => handleAction("عرض", vehicle.plateNumber)}>
                            <span>عرض المركبة</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2" onClick={() => handleAction("تعديل", vehicle.plateNumber)}>
                            <span>تعديل البيانات</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2" onClick={() => handleAction("سجل العمليات", vehicle.plateNumber)}>
                            <span>سجل العمليات</span>
                            <History className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex justify-end gap-2 text-destructive" onClick={() => handleAction("شطب", vehicle.plateNumber)}>
                            <span>شطب المركبة</span>
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