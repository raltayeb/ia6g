
"use client";

import { Car, Plus, Search, MapPin, MoreVertical, Fuel, Wrench, User } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Vehicle } from "@/types/erp";
import { SaudiRiyalIcon } from "@/components/icons/saudi-riyal";
import { toArabicDigits, formatCurrencyValue } from "@/lib/utils";

const mockVehicles: Vehicle[] = [
  { id: "1", plateNumber: "أ ب ج 1234", model: "تويوتا هايلكس 2023", type: "Truck", driverName: "أحمد علي", lastServiceDate: "2024-03-10", status: "Active", purchaseValue: 120000 },
  { id: "2", plateNumber: "د هـ و 5678", model: "هيونداي إلنترا 2022", type: "Sedan", driverName: "محمد خالد", lastServiceDate: "2024-02-15", status: "Maintenance", purchaseValue: 75000 },
  { id: "3", plateNumber: "ز ح ط 9012", model: "مرسيدس أكتروس", type: "Truck", driverName: "سعيد سالم", lastServiceDate: "2024-04-01", status: "Active", purchaseValue: 450000 },
  { id: "4", plateNumber: "ي ك ل 3456", model: "تويوتا هايس", type: "Van", driverName: "يوسف إبراهيم", lastServiceDate: "2023-12-20", status: "Out of Service", purchaseValue: 110000 },
  { id: "5", plateNumber: "م ن و 7890", model: "فورد F-150", type: "Truck", driverName: "فيصل أحمد", lastServiceDate: "2024-03-25", status: "Active", purchaseValue: 180000 },
];

export default function VehiclesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#F2F2F7]">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 border-b bg-white/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-headline text-xl font-bold text-primary">إدارة الأسطول</h1>
          </div>
          <Button className="gap-2 rounded-xl shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            تسجيل مركبة
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-none shadow-sm rounded-3xl bg-emerald-50">
              <CardContent className="p-4 flex flex-row-reverse items-center justify-between">
                <div className="p-3 bg-emerald-500 rounded-2xl text-white">
                  <Car className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-emerald-700 font-black uppercase tracking-widest">إجمالي الوحدات</p>
                  <p className="text-2xl font-black text-emerald-900">{toArabicDigits(58)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-blue-50">
              <CardContent className="p-4 flex flex-row-reverse items-center justify-between">
                <div className="p-3 bg-blue-500 rounded-2xl text-white">
                  <User className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-blue-700 font-black uppercase tracking-widest">السائقين النشطين</p>
                  <p className="text-2xl font-black text-blue-900">{toArabicDigits(42)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-amber-50">
              <CardContent className="p-4 flex flex-row-reverse items-center justify-between">
                <div className="p-3 bg-amber-500 rounded-2xl text-white">
                  <Wrench className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-amber-700 font-black uppercase tracking-widest">في الصيانة</p>
                  <p className="text-2xl font-black text-amber-900">{toArabicDigits(6)}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm rounded-3xl bg-slate-100">
              <CardContent className="p-4 flex flex-row-reverse items-center justify-between">
                <div className="p-3 bg-slate-500 rounded-2xl text-white">
                  <Fuel className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-700 font-black uppercase tracking-widest">تكاليف الوقود</p>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-2xl font-black text-slate-900">{toArabicDigits(12.4)}ألف</span>
                    <SaudiRiyalIcon className="h-5 w-5 opacity-70" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث برقم اللوحة أو الموديل..." className="pr-9 rounded-xl border-slate-200" />
            </div>
          </div>

          <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[150px] text-right font-bold">رقم اللوحة</TableHead>
                  <TableHead className="text-right font-bold">الموديل والنوع</TableHead>
                  <TableHead className="text-right font-bold">السائق</TableHead>
                  <TableHead className="text-right font-bold">الحالة</TableHead>
                  <TableHead className="text-right font-bold">آخر صيانة</TableHead>
                  <TableHead className="text-right font-bold">التقييم</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="text-right font-black text-primary">{toArabicDigits(vehicle.plateNumber)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col">
                        <span className="font-bold">{vehicle.model}</span>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                          {vehicle.type === 'Truck' ? 'شاحنة' : vehicle.type === 'Sedan' ? 'سيدان' : vehicle.type === 'Van' ? 'فان' : 'حافلة'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="font-medium">{vehicle.driverName || "غير محدد"}</span>
                        <div className="h-7 w-7 rounded-lg bg-accent flex items-center justify-center text-[10px] text-white font-black">
                          {vehicle.driverName?.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={vehicle.status === "Active" ? "default" : vehicle.status === "Maintenance" ? "secondary" : "destructive"}
                        className={`rounded-lg ${vehicle.status === "Active" ? "bg-emerald-500 hover:bg-emerald-600 border-none" : ""}`}
                      >
                        {vehicle.status === 'Active' ? 'نشط' : vehicle.status === 'Maintenance' ? 'صيانة' : 'خارج الخدمة'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground font-medium">{toArabicDigits(vehicle.lastServiceDate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 font-mono font-black justify-end">
                        {formatCurrencyValue(vehicle.purchaseValue)}
                        <SaudiRiyalIcon className="h-4 w-4 opacity-70" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="rounded-lg">
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
