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
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-primary" />
            <h1 className="text-sm font-black text-primary">إدارة الأسطول</h1>
          </div>
          <Button size="sm" className="gap-2 rounded-xl shadow-sm font-bold h-9" onClick={() => handleAction("تسجيل", "جديدة")}>
            <Plus className="h-4 w-4" />
            إضافة مركبة
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">إجمالي الوحدات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-black text-right">{toArabicDigits(58)}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">السائقين النشطين</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-black text-right text-emerald-600">{toArabicDigits(42)}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">في الصيانة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-black text-right text-rose-600">{toArabicDigits(6)}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardHeader className="pb-2 text-right">
                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">تكاليف الوقود</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 justify-end">
                  <span className="text-xl font-black">{toArabicDigits(12.4)}ألف</span>
                  <SaudiRiyalIcon className="h-4 w-4 text-primary opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث برقم اللوحة..." className="pr-10 h-10 rounded-2xl border-none bg-white/80 text-xs" dir="rtl" />
            </div>
          </div>

          <Card className="rounded-3xl border-none bg-white/80 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">رقم اللوحة</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الموديل والنوع</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">السائق</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">الحالة</TableHead>
                  <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">آخر صيانة</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="hover:bg-muted/30 transition-colors border-b border-slate-100/50 last:border-0">
                    <TableCell className="text-right font-black text-xs">
                      {toArabicDigits(vehicle.plateNumber)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{vehicle.model}</span>
                        <span className="text-[9px] text-muted-foreground">
                          {vehicle.type === 'Truck' ? 'شاحنة' : vehicle.type === 'Sedan' ? 'سيدان' : 'فان'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs font-medium">{vehicle.driverName || "غير محدد"}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant="secondary"
                        className={`rounded-lg px-3 py-0.5 text-[9px] font-bold border-none ${
                          vehicle.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                          vehicle.status === 'Maintenance' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {vehicle.status === 'Active' ? 'نشط' : vehicle.status === 'Maintenance' ? 'صيانة' : 'خارج الخدمة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-[11px] text-muted-foreground font-medium">{toArabicDigits(vehicle.lastServiceDate)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-2xl">
                          <DropdownMenuItem className="flex items-center gap-2 text-right justify-end text-xs" onClick={() => handleAction("عرض", vehicle.plateNumber)}>
                            <span>عرض التفاصيل</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-right justify-end text-xs" onClick={() => handleAction("تعديل", vehicle.plateNumber)}>
                            <span>تعديل السجل</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-right justify-end text-xs text-rose-600" onClick={() => handleAction("شطب", vehicle.plateNumber)}>
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
