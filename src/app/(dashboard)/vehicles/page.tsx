"use client";

import { Car, Plus, Search, MoreVertical, Fuel, Wrench, User, Edit, Trash2, Eye } from "lucide-react";
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
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Vehicle } from "@/types/erp";

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
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b sticky top-0 bg-background/95 backdrop-blur z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-sm font-bold tracking-tight">إدارة الأسطول</h1>
          </div>
          <Button size="sm" className="gap-2 rounded-lg shadow-sm font-bold h-8" onClick={() => handleAction("تسجيل", "جديدة")}>
            <Plus className="h-3.5 w-3.5" />
            مركبة جديدة
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="shadow-none border rounded-xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">إجمالي الوحدات</p>
                  <p className="text-xl font-black">{toArabicDigits(58)}</p>
                </div>
                <div className="p-2 bg-muted rounded-lg">
                  <Car className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-none border rounded-xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">السائقين النشطين</p>
                  <p className="text-xl font-black">{toArabicDigits(42)}</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <User className="h-4 w-4 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-none border rounded-xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">في الصيانة</p>
                  <p className="text-xl font-black text-rose-600">{toArabicDigits(6)}</p>
                </div>
                <div className="p-2 bg-rose-50 rounded-lg">
                  <Wrench className="h-4 w-4 text-rose-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-none border rounded-xl">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">تكاليف الوقود</p>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-xl font-black">{toArabicDigits(12.4)}ألف</span>
                    <SaudiRiyalIcon className="h-4 w-4 opacity-70" />
                  </div>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Fuel className="h-4 w-4 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث برقم اللوحة..." className="pr-10 h-9 text-xs rounded-lg" dir="rtl" />
            </div>
          </div>

          <Card className="rounded-xl border shadow-none overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">رقم اللوحة</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الموديل والنوع</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">السائق</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الحالة</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">آخر صيانة</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">التقييم</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="hover:bg-muted/30">
                    <TableCell className="text-right font-black text-xs">
                      {toArabicDigits(vehicle.plateNumber)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{vehicle.model}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {vehicle.type === 'Truck' ? 'شاحنة' : vehicle.type === 'Sedan' ? 'سيدان' : 'فان'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs font-medium">{vehicle.driverName || "غير محدد"}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={vehicle.status === "Active" ? "default" : "secondary"}
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${vehicle.status === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600 border-none' : ''}`}
                      >
                        {vehicle.status === 'Active' ? 'نشط' : vehicle.status === 'Maintenance' ? 'صيانة' : 'خارج الخدمة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-[11px] text-muted-foreground font-medium">{toArabicDigits(vehicle.lastServiceDate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end text-xs font-black">
                        {formatCurrencyValue(vehicle.purchaseValue)}
                        <SaudiRiyalIcon className="h-3.5 w-3.5 opacity-60" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="flex items-center gap-2 text-right justify-end" onClick={() => handleAction("عرض", vehicle.plateNumber)}>
                            <span>عرض التفاصيل</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-right justify-end" onClick={() => handleAction("تعديل", vehicle.plateNumber)}>
                            <span>تعديل السجل</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-right justify-end text-rose-600" onClick={() => handleAction("شطب", vehicle.plateNumber)}>
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
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
