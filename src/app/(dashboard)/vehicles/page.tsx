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
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center justify-between px-4 border-b sticky top-0 bg-background z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-sm font-semibold">إدارة الأسطول</h1>
          </div>
          <Button size="sm" className="gap-1" onClick={() => handleAction("تسجيل", "جديدة")}>
            <Plus className="h-3.5 w-3.5" />
            تسجيل مركبة
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <Car className="h-4 w-4 text-muted-foreground" />
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase">إجمالي الوحدات</p>
                  <p className="text-xl font-bold">{toArabicDigits(58)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase">السائقين</p>
                  <p className="text-xl font-bold">{toArabicDigits(42)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <Wrench className="h-4 w-4 text-muted-foreground" />
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase">في الصيانة</p>
                  <p className="text-xl font-bold text-rose-600">{toArabicDigits(6)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <Fuel className="h-4 w-4 text-muted-foreground" />
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase">الوقود</p>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-xl font-bold">{toArabicDigits(12.4)}ألف</span>
                    <SaudiRiyalIcon className="h-4 w-4 opacity-70" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث برقم اللوحة..." className="pr-8 h-8 text-xs" dir="rtl" />
            </div>
          </div>

          <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right text-xs">رقم اللوحة</TableHead>
                  <TableHead className="text-right text-xs">الموديل</TableHead>
                  <TableHead className="text-right text-xs">السائق</TableHead>
                  <TableHead className="text-right text-xs">الحالة</TableHead>
                  <TableHead className="text-right text-xs">آخر صيانة</TableHead>
                  <TableHead className="text-right text-xs">القيمة</TableHead>
                  <TableHead className="w-[50px] text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="text-right font-mono text-xs font-medium">
                      {toArabicDigits(vehicle.plateNumber)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">{vehicle.model}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {vehicle.type === 'Truck' ? 'شاحنة' : vehicle.type === 'Sedan' ? 'سيدان' : 'فان'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs">{vehicle.driverName || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={vehicle.status === "Active" ? "default" : "secondary"} className="text-[10px] font-normal">
                        {vehicle.status === 'Active' ? 'نشط' : 'صيانة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">{toArabicDigits(vehicle.lastServiceDate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end text-xs font-semibold">
                        {formatCurrencyValue(vehicle.purchaseValue)}
                        <SaudiRiyalIcon className="h-3 w-3 opacity-60" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-right">
                          <DropdownMenuItem className="flex flex-row-reverse gap-2 text-xs" onClick={() => handleAction("عرض", vehicle.plateNumber)}>
                            <Eye className="h-3.5 w-3.5" /> عرض
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex flex-row-reverse gap-2 text-xs" onClick={() => handleAction("تعديل", vehicle.plateNumber)}>
                            <Edit className="h-3.5 w-3.5" /> تعديل
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex flex-row-reverse gap-2 text-xs text-rose-600" onClick={() => handleAction("شطب", vehicle.plateNumber)}>
                            <Trash2 className="h-3.5 w-3.5" /> شطب
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