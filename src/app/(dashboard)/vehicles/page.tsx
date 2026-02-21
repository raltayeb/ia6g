
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
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-xl font-bold text-primary">إدارة الأسطول</h1>
          </div>
          <Button className="gap-2 rounded-xl shadow-lg shadow-primary/20" onClick={() => handleAction("تسجيل", "جديدة")}>
            <Plus className="h-4 w-4" />
            تسجيل مركبة
          </Button>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* MD3 Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <Car className="h-5 w-5 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">إجمالي الوحدات</p>
                  <p className="text-2xl font-black">{toArabicDigits(58)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="p-3 bg-blue-50 rounded-2xl">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">السائقين النشطين</p>
                  <p className="text-2xl font-black">{toArabicDigits(42)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="p-3 bg-rose-50 rounded-2xl">
                  <Wrench className="h-5 w-5 text-rose-600" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">في الصيانة</p>
                  <p className="text-2xl font-black text-rose-600">{toArabicDigits(6)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-white/80">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="p-3 bg-emerald-50 rounded-2xl">
                  <Fuel className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">تكاليف الوقود</p>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-2xl font-black">{toArabicDigits(12.4)}ألف</span>
                    <SaudiRiyalIcon className="h-5 w-5 text-emerald-600 opacity-80" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث برقم اللوحة أو الموديل..." className="pr-9 rounded-xl border-slate-200 text-right" dir="rtl" />
            </div>
          </div>

          {/* MD3 Clean Table Container */}
          <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="text-right font-bold text-slate-800">رقم اللوحة</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">الموديل والنوع</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">السائق</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">الحالة</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">آخر صيانة</TableHead>
                  <TableHead className="text-right font-bold text-slate-800">التقييم</TableHead>
                  <TableHead className="w-[80px] text-center font-bold text-slate-800">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="text-right font-mono font-black text-primary text-xs">
                      {toArabicDigits(vehicle.plateNumber)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col text-right">
                        <span className="font-bold text-sm text-slate-900">{vehicle.model}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                          {vehicle.type === 'Truck' ? 'شاحنة' : vehicle.type === 'Sedan' ? 'سيدان' : vehicle.type === 'Van' ? 'فان' : 'حافلة'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-xs font-medium">{vehicle.driverName || "غير محدد"}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={vehicle.status === "Active" ? "default" : vehicle.status === "Maintenance" ? "secondary" : "destructive"}
                        className={`rounded-lg ${vehicle.status === "Active" ? "bg-emerald-500 hover:bg-emerald-600 border-none" : ""}`}
                      >
                        {vehicle.status === 'Active' ? 'نشط' : vehicle.status === 'Maintenance' ? 'صيانة' : 'خارج الخدمة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground font-mono">
                      {toArabicDigits(vehicle.lastServiceDate)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 font-mono font-black justify-end text-sm">
                        {formatCurrencyValue(vehicle.purchaseValue)}
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
                          <DropdownMenuItem className="flex justify-end gap-2 text-right" onClick={() => handleAction("عرض", vehicle.plateNumber)}>
                            <span>عرض المركبة</span>
                            <Eye className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2 text-right" onClick={() => handleAction("تعديل", vehicle.plateNumber)}>
                            <span>تعديل البيانات</span>
                            <Edit className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex justify-end gap-2 text-right" onClick={() => handleAction("سجل العمليات", vehicle.plateNumber)}>
                            <span>سجل العمليات</span>
                            <History className="h-4 w-4" />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex justify-end gap-2 text-right text-rose-600 focus:text-rose-600 focus:bg-rose-50" onClick={() => handleAction("شطب", vehicle.plateNumber)}>
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
